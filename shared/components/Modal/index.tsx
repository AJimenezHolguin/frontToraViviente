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
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/types/color.enum";
import { Sizes } from "@/types/sizes.enum";
import { RadiusProps } from "@/types/radius.enum";
import { useSession } from "next-auth/react";

import { ConfirmModal } from "./ConfirmModal";
import { AlertModal } from "./ModalAlert";
import { ModalSongProps, SongFormState } from "./types";

import { editSongHandler } from "@/shared/feature/songs/editSongHandler";
import { createSongHandler } from "@/shared/feature/songs/createSongHandler";

export const ModalSong: React.FC<ModalSongProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  onSongCreated,
  songToEdit,
}) => {
  const letraRef = useRef<HTMLInputElement>(null);
  const acordeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<SongFormState>({
    name: "",
    linkSong: "",
    category: "",
    fileSong: null,
    fileScore: null,
  });

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (songToEdit) {
      setForm({
        name: songToEdit.name,
        linkSong: songToEdit.linkSong,
        category: songToEdit.category,
        fileSong: null,
        fileScore: null,
      });
    } else {
      setForm({
        name: "",
        linkSong: "",
        category: "",
        fileSong: null,
        fileScore: null,
      });
    }
  }, [songToEdit]);

  useEffect(() => {
    const { name, linkSong, category, fileSong, fileScore } = form;

    setIsFormValid(
      !!name && !!linkSong && !!category && !!fileSong && !!fileScore
    );
  }, [form]);

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
            fileSongPublicId: songToEdit.fileSong?.public_id || "",
            fileScorePublicId: songToEdit.fileScore?.public_id || "",
          })
        : await createSongHandler(form, session.user.id);

      setAlertType("success");
      setAlertMessage(
        result && "message" in result
          ? result.message
          : "¡Canción guardada correctamente!"
      );
      setIsOpen(false);
      setTimeout(() => {
        onClose();
        onSongCreated();
      }, 7000);
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
                <Input
                  isRequired
                  label="Nombre"
                  placeholder="Nombre de la canción"
                  value={form.name}
                  variant="bordered"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  isRequired
                  label="URL"
                  placeholder="www.youtube.com"
                  value={form.linkSong}
                  variant="bordered"
                  onChange={(e) =>
                    setForm({ ...form, linkSong: e.target.value })
                  }
                />

                <SelectedInput
                  isRequired
                  value={form.category}
                  onChange={(value) => setForm({ ...form, category: value })}
                />

                <div className="w-1/2 flex flex-col gap-4 justify-center mt-[10px]">
                  <div className="flex flex-col gap-1 w-1/2">
                    <Button
                      color={Colors.PRIMARY}
                      radius={RadiusProps.MD}
                      size={Sizes.SM}
                      onPress={() => handleFileClick(letraRef)}
                    >
                      Subir letra PDF
                    </Button>
                    <input
                      ref={letraRef}
                      accept="application/pdf"
                      className="hidden"
                      type="file"
                      onChange={(e) => handleFileChange(e, "fileSong")}
                    />
                    {form.fileSong && (
                      <span className="text-xs text-gray-500 italic">
                        {form.fileSong.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-1/2">
                    <Button
                      color={Colors.PRIMARY}
                      radius={RadiusProps.MD}
                      size={Sizes.SM}
                      onPress={() => handleFileClick(acordeRef)}
                    >
                      Subir acorde PDF
                    </Button>
                    <input
                      ref={acordeRef}
                      accept="application/pdf"
                      className="hidden"
                      type="file"
                      onChange={(e) => handleFileChange(e, "fileScore")}
                    />
                    {form.fileScore && (
                      <span className="text-xs text-gray-500 italic">
                        {form.fileScore.name}
                      </span>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="mt-[10px]">
                <Button
                  color="danger"
                  variant="solid"
                  onPress={() => setIsOpen(false)}
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
