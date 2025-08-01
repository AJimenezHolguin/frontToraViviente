import { InputComponent } from "../Input";
import { InputProps, TypeProps } from "../Input/types";
import { SearchIcon } from "../table/TableIcons";

export const SearchComponent = ({
  value,
  onClear,
  onValueChange,
  classNames,
}: InputProps) => {
  return (
    <InputComponent
      classNames={classNames}
      isClearable={true}
      placeholder="Buscar por nombre..."
      startContent={<SearchIcon />}
      type={TypeProps.SEARCH}
      value={value}
      onClear={onClear}
      onValueChange={onValueChange}
    />
  );
};
