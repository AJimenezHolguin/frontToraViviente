import { RefObject } from "react";
import { SongFormState } from "../Modal/types";

export interface SongFormProps {
    form: SongFormState;
    setForm: React.Dispatch<React.SetStateAction<SongFormState>>;
    letraRef: RefObject<HTMLInputElement>;
    acordeRef: RefObject<HTMLInputElement>;
    handleFileClick: (ref: RefObject<HTMLInputElement>) => void;
    handleFileChange: (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "fileSong" | "fileScore"
    ) => void;
  }