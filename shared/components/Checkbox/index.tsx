import { Checkbox } from "@heroui/checkbox";

import { CheckboxProps } from "./types";

export const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const { defaultSelected = false, color, classNames, children, size } = props;

  return (
    <Checkbox
      classNames={classNames}
      color={color}
      defaultSelected={defaultSelected}
      size={size}
    >
      {children}
    </Checkbox>
  );
};
