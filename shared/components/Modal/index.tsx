import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import React, { useEffect, useRef, useState } from "react";

import { useSession } from "next-auth/react";

import { ConfirmModal } from "./ConfirmModal";
import { AlertModal } from "./ModalAlert";
import { ModalSongProps } from "./types";

import { editSongHandler } from "@/shared/feature/songs/editSongHandler";
import { createSongHandler } from "@/shared/feature/songs/createSongHandler";

import { SongForm } from "../SongForm";
import { useSongFormData } from "./hooks/useSongFormData";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const { form, setForm, initialForm, isFormModified } = useSongFormData(
    isOpen,
    songToEdit
  );

  useEffect(() => {
    if (songToEdit) {
      setIsFormValid(isFormModified());
    } else {
      const { name, linkSong, category, fileSong, fileScore } = form;

      setIsFormValid(
        !!name && !!linkSong && !!category && !!fileSong && !!fileScore
      );
    }
  }, [form, initialForm, songToEdit]);

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
      setAlertType("error");
      setAlertMessage("No tienes permisos para crear una canción");

      return;
    }

    try {
      setLoading(true);

      const result = songToEdit
        ? await editSongHandler(form, {
            ...songToEdit,
            fileSong: songToEdit.fileSong,
            fileScore: songToEdit.fileScore,
            fileSongPublicId: songToEdit.fileSong?.public_id,
            fileScorePublicId: songToEdit.fileScore?.public_id,
          })
        : await createSongHandler(form, session.user.id);

      setAlertType("success");
      setAlertMessage(
        result && "message" in result
          ? result.message
          : "¡Canción guardada correctamente!"
      );
      onClose();
      setTimeout(() => {
        onClose();
        onSongCreated();
      }, 3000);
    } catch (error: any) {
      setAlertType("error");
      setAlertMessage(error.message || "Error al guardar la canción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <ModalHeader className="flex flex-col gap-2">
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
                <Button
                  color="danger"
                  variant="solid"
                  onPress={() => onClose()}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isFormValid}
                  isLoading={loading}
                  onPress={() => setIsConfirmOpen(true)}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {alertType && (
        <AlertModal
          isOpen={!!alertType}
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertType(null)}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        message={
          songToEdit
            ? "¿Estás seguro de que deseas editar la canción?"
            : "¿Estás seguro de que deseas crear la canción?"
        }
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          handleSave();
          setIsConfirmOpen(false);
        }}
      />
    </>
  );
};
