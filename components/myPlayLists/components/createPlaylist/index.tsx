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

export const CreatePlayList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

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
                  base: "pl-5 pb-5 sm: pr-5 md:max-w-[80%]",
                }}
                isClearable={true}
                label="Nombre de la playlist"
                placeholder="Nueva playlist..."
                startContent={<SearchIcon />}
                type={TypeProps.TEXT}
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
                    <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                    <Checkbox value="sydney">Sydney</Checkbox>
                    <Checkbox value="tokyo">Tokyo</Checkbox>
                    <Checkbox value="londres">Londres</Checkbox>
                    <Checkbox value="paris">Paris</Checkbox>
                    <Checkbox value="berlin">Berlin</Checkbox>
                    <Checkbox value="madrid">Madrid</Checkbox>
                    <Checkbox value="roma">Roma</Checkbox>
                    <Checkbox value="nueva-york">Nueva York</Checkbox>
                    <Checkbox value="los-angeles">Los Angeles</Checkbox>
                    <Checkbox value="barcelona">Barcelona</Checkbox>
                    <Checkbox value="brasilia">Brasilia</Checkbox>
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
