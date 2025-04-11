import { Colors } from "./color.enum";
import { Sizes } from "./sizes.enum";

export enum AlertType {
    ERROR = "error",
    ACTION= "action", 
};

export enum AlertVariant {
    SOLID = "solid",
    BORDERED = "bordered",
    FLAT = "flat",
    FADED = "faded",                   
}

export interface CustomAlertProps {
  color: Colors;
  endContent: React.ReactNode;
  type: AlertType;
  title: string;
  isVisible: boolean;
  description: string;
  actionText?: string;
  size?: Sizes;
  variant: AlertVariant
  onActionClick?: () => void;
  onClose?: () => void;
}