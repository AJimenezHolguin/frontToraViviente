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
import { SearchIcon } from "@/shared/components/table/TableIcons";
import { Sizes } from "@/types/sizes.enum";
import { useEffect, useState } from "react";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { Song } from "@/types/SongsTypesProps";

type ModalPlaylistProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalPlaylist = ({ isOpen, onClose }: ModalPlaylistProps) => {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [responseData, setResponseData] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!isOpen) return;
      try {
        const response = await getAllSongs();

        setResponseData(response);
      } catch (error) {
        console.error("Error al obtener las canciones", error);
      }
    };

    fetchSongs();
  }, [isOpen]);

  const filterAllSongs = responseData.filter((song) =>
    song.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleClose = () => {
    setSelectedSongs([]);
    setFilterValue("");
    onClose();
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

          <InputComponent
            isClearable
            classNames={{ base: "pl-5 sm: pr-5 md:max-w-[90%]" }}
            label="Buscar canción"
            placeholder="Buscar canción..."
            size={Sizes.SM}
            startContent={<SearchIcon />}
            type={TypeProps.SEARCH}
            value={filterValue}
            onValueChange={setFilterValue}
          />

          <ModalBody className="overflow-y-auto h-[200px]">
            <p className="text-sm font-medium mb-2">Canciones disponibles:</p>
            <ScrollShadow
              className="overflow-y-auto h-[200px]"
              size={13}
              orientation="vertical"
            >
              <CheckboxGroup
                // label="Canciones disponibles:"
                value={selectedSongs}
                onChange={setSelectedSongs}
              >
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
            <Button color="danger" variant="light" onPress={handleClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleClose}>
              Action
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
