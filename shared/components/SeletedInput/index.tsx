import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { CategoryProps } from "@/types/category.enum";
import { SelectedInputProps } from "./types";

export const SelectedInput = ({ value, onChange }: SelectedInputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        isRequired
        label="Categoría"
        placeholder="Selecciona una categoría"
        selectedKeys={new Set([value])}
        variant="bordered"
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          onChange(selected);
        }}
      >
        {Object.values(CategoryProps).map((category) => (
          <SelectItem
            key={category}
            color="primary"
            textValue={category}
            className="group"
            classNames={{
              base: "hover:bg-primary-100 hover:text-primary-700 data-[hover=true]:bg-primary-100 data-[hover=true]:text-primary-700",
              title: "group-hover:text-primary-700"
            }}
          >
            {category}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
