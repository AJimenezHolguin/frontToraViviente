import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { CategoryProps } from "@/types/category.enum";
import { SelectedInputProps } from "./types";




export const SelectedInput = ({ value, onChange }: SelectedInputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        label="Categoría"
        placeholder="Selecciona una categoría"
        selectedKeys={value}
        variant="bordered"
        onSelectionChange={onChange}
     
       
      >
        {Object.values(CategoryProps).map((category) => (
          <SelectItem key={category} textValue={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
