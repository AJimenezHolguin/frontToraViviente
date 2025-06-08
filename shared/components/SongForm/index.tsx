import React from "react";
import { SelectedInput } from "../SeletedInput";
import { ColorButton } from "@/styles/colorButton.enum";
import { Sizes } from "@/types/sizes.enum";
import { RadiusProps } from "@/types/radius.enum";
import { SongFormProps } from "./types";
import { InputComponent } from "../Input";
import { VariantProps } from "../Input/types";
import { ButtonComponent } from "../Button";

export const SongForm: React.FC<SongFormProps> = ({
  form,
  setForm,
  letraRef,
  acordeRef,
  handleFileClick,
  handleFileChange,
}) => {
  return (
    <>
      <InputComponent
        isRequired
        label="Nombre"
        placeholder="Nombre de la canción"
        value={form.name}
        variant={VariantProps.BORDERED}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <InputComponent
        isRequired
        label="URL"
        placeholder="www.youtube.com"
        value={form.linkSong}
        variant={VariantProps.BORDERED}
        onChange={(e) => setForm({ ...form, linkSong: e.target.value })}
      />

      <SelectedInput
        isRequired
        value={form.category}
        onChange={(value) => setForm({ ...form, category: value })}
      />

      <div className="w-1/2 flex flex-col gap-4 justify-center mt-[10px]">
        <div className="flex flex-col gap-1 w-1/2">
          <ButtonComponent
            color={ColorButton.SECONDARY}
            radius={RadiusProps.MD}
            size={Sizes.SM}
            onPress={() => handleFileClick(letraRef)}
          >
            Subir letra PDF
          </ButtonComponent>
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
          <ButtonComponent
            color={ColorButton.SECONDARY}
            radius={RadiusProps.MD}
            size={Sizes.SM}
            onPress={() => handleFileClick(acordeRef)}
          >
            Subir acorde PDF
          </ButtonComponent>
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
    </>
  );
};
