import { Select, SelectItem } from "@heroui/react";
import { SelectedInputProps } from "./types";
import { inputWithLabelStyles } from "@/styles/inputStyles";

export const SelectedInput = ({  
  value,
  label,
  placeholder,
  options,
  isRequired = false,
  onChange,}: SelectedInputProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        isRequired={isRequired}
        classNames={inputWithLabelStyles}
        label={label}
        placeholder={placeholder}
        selectedKeys={new Set([value])}
        variant="bordered"
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          
          onChange(selected);
        }}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            color="primary"
            textValue={option.label}
            className="group"
            classNames={{
              base: "hover:bg-primary-100 hover:text-primary-700 data-[hover=true]:bg-primary-100 data-[hover=true]:text-primary-700",
              title: "group-hover:text-primary-700",
  
            }}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
