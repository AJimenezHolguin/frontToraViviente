import { Song } from "@/types/SongsTypesProps";

export interface ModalSongProps {
  isOpen: boolean;
  setIsOpen?: (open: boolean) => void;
  onClose: () => void;
  onSongCreated: () => void;
  songToEdit?: Song | null;
}

export type AlertType = "success" | "error" | null;
export enum PositionModal {
  TOP = "top",
  CENTER = "center",
  BOTTOM = "bottom",
  AUTO = "auto",
}

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: AlertType;
  message: string;
  placement?: PositionModal
}

export interface ConfirmModalProps {
  titleButton?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputValue?:string) => void;
  message: string;
  isLoading?: boolean;
  placement?: PositionModal
  withInput?: boolean;
  inputLabel?:string;
  showCancelButton?: boolean;
}

export type SongFormState = {
  name: string;
  linkSong: string;
  category: string;
  fileSong: File | null;
  fileScore: File | null;
};