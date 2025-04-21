
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
  } from "@heroui/react";
import { SelectedInput } from "../SeletedInput";
  
  export const ModalSong = ({
    isOpen,
    setIsOpen,
    onClose,
  }: {
    isOpen: boolean;
    setIsOpen: (open:boolean) => void;
    onClose: () => void;
  }) => {
    return (
        <Modal
        isDismissable={false}
        isOpen={isOpen}
        placement="center"
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nueva Canción</ModalHeader>
              <ModalBody>
                <Input label="Nombre" placeholder="Nombre de la canción" variant="bordered" />
                <Input label="URL" placeholder="www.youtube.com" variant="bordered" />
                <SelectedInput />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => setIsOpen(false)}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };
  