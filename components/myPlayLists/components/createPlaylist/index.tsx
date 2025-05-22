"use client";
import { ButtonComponent } from "@/shared/components/Button";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps } from "@/shared/components/Input/types";
import { SearchIcon } from "@/shared/components/table/TableIcons";
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
import { useState } from "react";
import { songs } from "./constant";

export const CreatePlayList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [filterValue,setFilterValue] = useState("");


  const filterSongs = songs.filter((song) => 
    song.label.toLowerCase().includes(filterValue.toLowerCase())
)

  return (
    <>
      <ButtonComponent
        onPress={() => {
          setIsModalOpen(true);
        }}
      >
        Canciones
      </ButtonComponent>

      <Modal
        isOpen={isModalOpen}
        placement="center"
        onClose={() => setIsModalOpen(false)}
      >
        <CreatePlayList />

        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Playlist
              </ModalHeader>
            
              <InputComponent
                isRequired
                classNames={{
                  base: "pl-5 pb-6 sm: pr-5 md:max-w-[80%]",
                }}
                isClearable={true}
                label="Nombre de la playlist"
                placeholder="Nueva playlist..."
                type={TypeProps.TEXT}
              />
                <InputComponent
                classNames={{
                  base: "pl-5 sm: pr-5 md:max-w-[80%]",
                }}
                isClearable={true}
                label="Buscar canción"
                placeholder="Buscar canción..."
                startContent={<SearchIcon />}
                type={TypeProps.SEARCH}
                value={filterValue}
                onValueChange={setFilterValue}
              />
             

              <ModalBody>
                <CheckboxGroup
                  label="Canciones disponibles:"
                  value={selectedSongs}
                  onChange={setSelectedSongs}

                >
                  <ScrollShadow
                    className="flex flex-col w-[400px] h-[200px]"
                    orientation="vertical"
                  >
                
                     {filterSongs.map((song) => (
                        <Checkbox key={song.value} value={song.value}>
                            {song.label}
                        </Checkbox>
                     )
                     )}   

                  </ScrollShadow>
                </CheckboxGroup>
                <p className="text-default-700 text-small">Seleccionado: {selectedSongs.join(", ")}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
