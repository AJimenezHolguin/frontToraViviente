import { TextProps } from "@/shared/components/Text/types";
import { COLORS } from "./colors";


export const USER_ROLE_STYLES  : Record<string, TextProps> = {
  admin: {
    $color: COLORS.secondary,
    $bg: COLORS.secondary_light,
  },
  musician: {
    $color: COLORS.purple,
    $bg: COLORS.purple_light,
  },
  user: {
    $color: COLORS.orange,
    $bg: COLORS.yellow_light,
  },
};

export const getUserRoleColor = (role: string) => {
  return (
    USER_ROLE_STYLES [role?.toLowerCase().trim()] ?? {
      $color: COLORS.lila,
      $bg: COLORS.danger,
    }
  );
};