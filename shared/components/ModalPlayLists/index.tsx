"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
  ScrollShadow,
} from "@heroui/react";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps, VariantProps } from "@/shared/components/Input/types";
import { useEffect, useState } from "react";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { Song } from "@/types/SongsTypesProps";
import { SearchComponent } from "../Search";

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
    const fetchAllSongs = async () => {
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
      } catch (error) {
        console.error("Error al obtener las canciones", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSongs();
  }, [isOpen, page, filterValue]);

  useEffect(() => {
    if (!isOpen) return;
    setResponseData([]);
    setPage(1);
    setHasMore(true);
  }, [filterValue]);

  const filterAllSongs = responseData.filter((song) =>
    song.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleClose = () => {
    setSelectedSongs([]);
    setFilterValue("");
    onClose();
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isAtBottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleClose}
    >
      <ModalContent className="h-[400px]">
        <>
          <ModalHeader className="flex flex-col gap-1">
            Crear Playlist
          </ModalHeader>

          <InputComponent
            isClearable
            isRequired
            classNames={{ base: "pl-5 pb-6 sm: pr-5 md:max-w-[90%]" }}
            label="Nombre de la playlist"
            placeholder="Nueva playlist..."
            type={TypeProps.TEXT}
            variant={VariantProps.UNDERLINED}
          />
          <SearchComponent
            classNames={{ base: "pl-5 sm: pr-5 md:max-w-[90%]" }}
            value={filterValue}
            onValueChange={setFilterValue}
          />

          <ModalBody className="overflow-y-auto h-[200px]">
            <p className="text-sm font-medium mb-2">Canciones disponibles:</p>
            <ScrollShadow
              className="overflow-y-auto h-[200px]"
              orientation="vertical"
              size={13}
              onScroll={handleScroll}
            >
              <CheckboxGroup value={selectedSongs} onChange={setSelectedSongs}>
                <div className="flex flex-col gap-1">
                  {filterAllSongs.map((song) => (
                    <Checkbox key={song._id} value={song._id}>
                      {song.name}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </ScrollShadow>
            <p className="text-default-700 text-small">
              Seleccionado:{" "}
              {selectedSongs
                .map((id) => responseData.find((song) => song._id === id)?.name)
                .filter(Boolean)
                .join(", ")}
            </p>
          </ModalBody>

          <ModalFooter>
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
