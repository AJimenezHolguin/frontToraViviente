import { TextProps } from "@/shared/components/Text/types";
import { COLORS } from "./colors";



export const MOVEMENT_TYPE_STYLES  : Record<string, TextProps> = {
  ingreso: {
    $color: COLORS.secondary,
    $bg: COLORS.secondary_light,
  },
  gasto: {
    $color: COLORS.danger,
    $bg: COLORS.danger_light,
  },
  ajuste: {
    $color: COLORS.purple,
    $bg: COLORS.purple_light,
  },
  anulacion: {
    $color: COLORS.orange,
    $bg: COLORS.yellow_light,
  },
};

export const getMovementTypeColor = (type: string) => {
  return (
    MOVEMENT_TYPE_STYLES[type?.toLowerCase().trim()] ?? {
      $color: COLORS.lila,
      $bg: COLORS.danger,
    }
  );
};