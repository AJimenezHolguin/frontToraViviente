import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps, VariantProps } from "@/shared/components/Input/types";
import { useEffect, useState } from "react";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { Song } from "@/types/SongsTypesProps";
import { SearchComponent } from "../Search";
import { SwitchComponent } from "../Switch";

type ModalPlaylistProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalPlaylist = ({ isOpen, onClose }: ModalPlaylistProps) => {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [responseData, setResponseData] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await getAllSongs({
          page,
          take: 10,
          order: "ASC",
          search: filterValue,
        });

        setResponseData((prev) =>
          page === 1 ? response.data : [...prev, ...response.data]
        );
        setHasMore(response.data.length === 10);
      } catch (err) {
        console.error("Error al obtener canciones", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [page, filterValue, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setResponseData([]);
    setPage(1);
    setHasMore(true);
  }, [filterValue]);

  const filterAllSongs = responseData.filter((song) =>
    song.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (atBottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    setSelectedSongs([]);
    setFilterValue("");
    setResponseData([]);  
    setPage(1);           
    setHasMore(true); 
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleClose}
    >
      <ModalContent
        className="sm:my-0 w-full md:w-[600px]"
        style={{ maxHeight: "100vh" }}
      >
        <>
          <ModalHeader className="flex flex-col gap-1 text-primary">
            Crear Playlist
          </ModalHeader>

          {/* INPUT Y BUSCADOR */}
          <div className="px-6 flex flex-col gap-4">
            <InputComponent
              isClearable
              isRequired
              classNames={{ base: "w-full" }}
              label="Nombre de la playlist"
              placeholder="Nueva playlist..."
              type={TypeProps.TEXT}
              variant={VariantProps.UNDERLINED}
            />

            <SearchComponent
              classNames={{ base: "w-full" }}
              value={filterValue}
              onValueChange={setFilterValue}
            />
          </div>

          {/* BODY: LISTA Y SELECCIONADOS */}
          <ModalBody className="overflow-y-auto px-6 pt-4">
            <p className="text-sm font-medium mb-2 ">Canciones disponibles:</p>

            {/* SCROLL INTERNO SOLO PARA CANCIONES */}
            <div
              className="h-[200px] overflow-y-auto border rounded-md px-2"
              onScroll={handleScroll}
            >
              <CheckboxGroup  value={selectedSongs} onChange={setSelectedSongs}>
                <div className="flex flex-col gap-1 py-2">
                  {filterAllSongs.map((song) => (
                    <Checkbox key={song._id} value={song._id}>
                      {song.name}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </div>

            {/* SELECCIONADOS */}
            {selectedSongs.length > 0 && (
              <div
                className="mt-4 overflow-y-scroll"
                style={{ height: "100px" }}
              >
                <p className="text-sm font-medium mb-1 ">Canciones seleccionadas:</p>
                <div className="gap-1 pr-1">
                  {selectedSongs
                    .map((id) => responseData.find((song) => song._id === id))
                    .filter(Boolean)
                    .map((song) => (
                      <div
                        key={song!._id}
                        className="bg-primary/10 rounded-lg px-2 py-1 text-xs text-center text-secondary font-medium flex justify-between items-center gap-2"
                      >
                        <span className="truncate">{song!.name}</span>
                        <button
                          className="text-red-500 hover:text-red-700 text-xs font-bold"
                          title="Quitar"
                          onClick={() =>
                            setSelectedSongs((prev) =>
                              prev.filter((sid) => sid !== song!._id)
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
            <div className="flex">
          <SwitchComponent />
          <p className="text-md font-medium mb-2 pt-2 text-primary" style={{paddingLeft: "5px"}}>¿Playlist visible?</p>
          
            </div>
          </ModalBody>

          {/* FOOTER */}
          <ModalFooter className="px-6 py-4 flex justify-end gap-2">
            <Button color="danger" onPress={handleClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleClose}>
              Guardar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
