import type { Selection } from "@heroui/react";

export interface SelectedInputProps {
    value: Selection;
    onChange: (value: Selection) => void;
  }