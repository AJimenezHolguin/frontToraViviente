import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ConfirmModal } from "./ConfirmModal";
import { AlertModal } from "./ModalAlert";
import { ModalSongProps, PositionModal } from './types';
import { SongForm } from "../SongForm";
import { useSongFormData } from "../../hooks/songs/useSongFormData";
import { useFormValidation } from "../../hooks/songs/useFormValidation";
import { saveSongHandler } from "@/shared/feature/songs/saveSongHandler";
import { useModalAlert } from "../../hooks/songs/useModalAlert";
import { ButtonComponent } from "../Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { VariantButtonProps } from "../Button/types";

export const ModalSong: React.FC<ModalSongProps> = ({
  isOpen,
  onClose,
  onSongCreated,
  songToEdit,
}) => {
  const letraRef = useRef<HTMLInputElement>(null);
  const acordeRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();
  const { form, setForm, initialForm } = useSongFormData(isOpen, songToEdit);
  const { isFormValid } = useFormValidation(form, initialForm, songToEdit);

  const handleFileClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "fileSong" | "fileScore"
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSave = async () => {
    if (!session?.user) {
      showAlert("error", "No tienes permisos para crear una canción");

      return;
    }

    try {
      setLoading(true);

      await saveSongHandler({
        form,
        songToEdit,
        userId: session.user.id,
      });

      showAlert("success", "Canción guardada correctamente");
      onClose();
      setTimeout(() => {
        onClose();
        onSongCreated();
      }, 4000);
    } catch (error: any) {
      showAlert("error", "Error al guardar la canción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        placement={PositionModal.CENTER}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-2 text-primary">
                {songToEdit ? "Editar Canción" : "Nueva Canción"}
              </ModalHeader>
              <ModalBody>
                <SongForm
                  acordeRef={acordeRef}
                  form={form}
                  handleFileChange={handleFileChange}
                  handleFileClick={handleFileClick}
                  letraRef={letraRef}
                  setForm={setForm}
                />
              </ModalBody>

              <ModalFooter className="mt-[10px]">
                <ButtonComponent
                  color={ColorButton.DANGER}
                  variant={VariantButtonProps.SOLID}
                  onPress={() => onClose()}
                >
                  Cancelar
                </ButtonComponent>
                <ButtonComponent
                  color={ColorButton.PRIMARY}
                  isDisabled={!isFormValid || loading }
                  onPress={() =>
                    showConfirm(
                      songToEdit
                        ? "¿Estás seguro de que deseas editar la canción?"
                        : "¿Estás seguro de que deseas crear la canción?",
                      handleSave
                    )
                  }
                >
                  Guardar
                </ButtonComponent>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <AlertModal {...AlertModalProps} placement={PositionModal.CENTER}/>
      <ConfirmModal {...ConfirmModalProps} 
                    isLoading={loading} 
                    placement = {PositionModal.CENTER}
                    title={loading ? songToEdit ? "Actualizando..." : "Guardando..." 
                      : songToEdit ? "Actualizar": "Guardar"}
                    />
    </>
  );
};
