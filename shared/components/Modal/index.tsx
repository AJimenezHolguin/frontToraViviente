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
import axiosInstance from "@/config/axios/axiosInstance";
import axiosCloudinary from "@/config/axios/axiosCloudinary";
import { useSession } from "next-auth/react";
import { deleteImage } from "@/services/deleteFileCloudinary.service";
import { ConfirmModal } from "./ConfirmModal";
import { AlertModal } from "./ModalAlert";
import { ModalSongProps } from "./types";

export const ModalSong: React.FC<ModalSongProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  onSongCreated,
}) => {
  const letraRef = useRef<HTMLInputElement>(null);
  const acordeRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [linkSong, setLinkSong] = useState("");
  const [category, setCategory] = useState("");
  const [fileSong, setFileSong] = useState<File | null>(null);
  const [fileScore, setFileScore] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Estado para manejar el tipo de alerta
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (name && linkSong && category && fileSong && fileScore) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [name, linkSong, category, fileSong, fileScore]);

  const handleFileClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleFileSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) setFileSong(file);
  };

  const handleFileScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) setFileScore(file);
  };

  const uploadFileToCloudinary = async (
    file: File,
    preset: string
  ): Promise<{ public_id: string; secure_url: string } | null> => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", preset);

    console.log("este es el preset", preset);

    try {
      const response = await axiosCloudinary.post("/upload", formData);
      const { public_id, secure_url } = response.data;

      return { public_id, secure_url };
    } catch (error) {
      console.error(`Error al subir archivo a Cloudinary [${preset}]:`, error);

      return null;
    }
  };

  const handleSave = async () => {
    if (!name || !linkSong || !category || !fileSong || !fileScore) {
      setAlertType("error");
      setAlertMessage("Por favor completa todos los campos");

      return;
    }

    if (!session?.user) {
      setAlertType("error");
      setAlertMessage("No tienes permisos para crear una canción");

      return;
    }

    let uploadedFileSong: { public_id: string; secure_url: string } | null =
      null;
    let uploadedFileScore: { public_id: string; secure_url: string } | null =
      null;



    try {
      setLoading(true);

      const [song, score] = await Promise.all([
        uploadFileToCloudinary(fileSong, "letra_upload"),
        uploadFileToCloudinary(fileScore, "acorde_upload"),
      ]);

      uploadedFileSong = song;
      uploadedFileScore = score;

      if (!uploadedFileSong || !uploadedFileScore) {
        setAlertType("error");
        setAlertMessage("Error al subir los archivos a Cloudinary");

        return;
      }
      await axiosInstance.post(`/songs/create/${session.user.id}`, {
        name,
        linkSong,
        category,
        fileSong: uploadedFileSong,
        fileScore: uploadedFileScore,
      });

      setAlertType("success");
      setAlertMessage("¡La canción se ha creado exitosamente!");
      setIsOpen(false);

      setTimeout(() => {
        onClose();
        onSongCreated();
      }, 5000);
 
    } catch (error) {
      console.error("Error al guardar canción:", error);

      if (uploadedFileSong?.public_id) {
        await deleteImage(uploadedFileSong.public_id);
      }
      if (uploadedFileScore?.public_id) {
        await deleteImage(uploadedFileScore.public_id);
      }

      setAlertType("error");
      setAlertMessage(
        "Hubo un error al crear la canción, por favor intenta nuevamente."
      );
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
                Nueva Canción
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Nombre"
                  placeholder="Nombre de la canción"
                  value={name}
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  isRequired
                  label="URL"
                  placeholder="www.youtube.com"
                  value={linkSong}
                  variant="bordered"
                  onChange={(e) => setLinkSong(e.target.value)}
                />

                <SelectedInput
                  isRequired
                  value={category}
                  onChange={setCategory}
                />

                <div className="w-1/2 flex flex-col gap-4 justify-center mt-[10px]">
                  <div className="flex flex-col gap-1 w-1/2">
                    <Button
                      color={Colors.PRIMARY}
                      radius={RadiusProps.NONE}
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
                      onChange={handleFileSongChange}
                    />
                    {fileSong && (
                      <span className="text-xs text-gray-500 italic">
                        {fileSong.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 w-1/2">
                    <Button
                      color={Colors.PRIMARY}
                      radius={RadiusProps.NONE}
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
                      onChange={handleFileScoreChange}
                    />
                    {fileScore && (
                      <span className="text-xs text-gray-500 italic">
                        {fileScore.name}
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
        message="¿Estás seguro de que deseas crear la canción?"
        onClose={() => setIsConfirmOpen(false)}
      
        onConfirm={() => {
          handleSave();
          setIsConfirmOpen(false);
        }}
      />
    </>
  );
};
