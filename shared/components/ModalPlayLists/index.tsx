import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
} from "@heroui/react";
import { InputComponent } from "@/shared/components/Input";
import { TypeProps, VariantProps } from "@/shared/components/Input/types";
import { useEffect, useState } from "react";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { Playlist } from "@/types/PlaylistsTypesProps";
import { useFormValidationPlaylist } from "@/shared/hooks/playlists/useFormValidationPlaylist";
import { usePlaylistFormData } from "@/shared/hooks/playlists/usePlaylistFormData";
import { useSession } from "next-auth/react";
import { useModalAlert } from "@/shared/hooks/songs/useModalAlert";
import { savePlaylistHandler } from "@/shared/feature/ playlist/utils/saveSongHandler";
import { ButtonComponent } from "../Button";
import { ColorButton } from "@/styles/colorButton.enum";
import { AlertModal } from "../Modal/ModalAlert";
import { ConfirmModal } from "../Modal/ConfirmModal";
import { PositionModal } from "../Modal/types";
import { PlaylistForm } from "../PlaylistForm"; // NUEVO
import { Song } from "@/types/SongsTypesProps";
import { SearchComponent } from "../Search";

export const ModalPlaylist = ({
  isOpen,
  onClose,
  playlistToEdit,
  onPlaylistCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistCreated: () => void;
  playlistToEdit: Playlist | null;
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [responseData, setResponseData] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showAlert, showConfirm, AlertModalProps, ConfirmModalProps } =
    useModalAlert();
  const { data: session } = useSession();

  const { form, setForm, initialForm } = usePlaylistFormData(
    isOpen,
    playlistToEdit
  );
  const { isFormValid } = useFormValidationPlaylist(
    form,
    initialForm,
    playlistToEdit
  );

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
   
    if (atBottom && hasMore && !loading) setPage((prev) => prev + 1);
  };

  const handleClose = () => {
    setFilterValue("");
    setResponseData([]);
    setPage(1);
    setHasMore(true);
    onClose();
  };

  const handleSave = async () => {
    if (!session?.user) {
      showAlert("error", "No tienes permisos para crear una playlist");
     
      return;
    }
    try {
      setLoading(true);
      await savePlaylistHandler({
        form,
        playlistToEdit,
        userId: session?.user.id,
      });
      showAlert("success", "Playlist guardada correctamente");
      onClose();
      setTimeout(() => {
        onClose();
        onPlaylistCreated();
      }, 4000);
    } catch (error) {
      showAlert("error", "Error al guardar la playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  
      <Modal isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={handleClose}>
  <ModalContent className="sm:my-0 w-full md:w-[600px] heigth-form">
    <>
      <ModalHeader className="flex flex-col gap-1 text-primary">
        {playlistToEdit ? "Editar Playlist" : "Nueva Playlist"}
      </ModalHeader>

      {/* SOLO INPUTS QUE NO DEBAN HACER SCROLL */}
      <div className="px-6 flex flex-col gap-4">
        <InputComponent
          isClearable
          isRequired
          classNames={{ base: "w-full" }}
          label="Nombre de la playlist"
          placeholder="Nueva playlist..."
          type={TypeProps.TEXT}
          value={form.name}
          variant={VariantProps.UNDERLINED}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <SearchComponent
          classNames={{ base: "w-full" }}
          value={filterValue}
          onValueChange={setFilterValue}
        />
      </div>

      {/* SCROLL INTERNO */}
      <ModalBody className="overflow-y-auto px-6 pt-4">
        <PlaylistForm
          filterAllSongs={filterAllSongs}
          filterValue={filterValue}
          form={form}
          handleScroll={handleScroll}
          responseData={responseData}
          setForm={setForm}
        />
      </ModalBody>

      <ModalFooter className="px-6 py-4 flex justify-end gap-2">
        <Button color="danger" onPress={handleClose}>
          Cancelar
        </Button>
        <ButtonComponent
          color={ColorButton.PRIMARY}
          isDisabled={!isFormValid || loading}
          onPress={() =>
            showConfirm(
              playlistToEdit
                ? "¿Estás seguro de que deseas editar la playlist?"
                : "¿Estás seguro de que deseas crear la playlist?",
              handleSave
            )
          }
        >
          Guardar
        </ButtonComponent>
      </ModalFooter>
    </>
  </ModalContent>
</Modal>


      <AlertModal {...AlertModalProps} placement={PositionModal.CENTER} />
      <ConfirmModal
        {...ConfirmModalProps}
        isLoading={loading}
        placement={PositionModal.CENTER}
        title={
          loading
            ? playlistToEdit
              ? "Actualizando..."
              : "Guardando..."
            : playlistToEdit
              ? "Actualizar"
              : "Guardar"
        }
      />
    </>
  );
};
