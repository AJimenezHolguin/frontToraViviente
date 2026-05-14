import { RoleProps } from "@/types/roles.enum";

export const roleOptions = [
  {
    label: "Administrador",
    value: RoleProps.ADMIN,
  },
  {
    label: "Músico",
    value: RoleProps.MUSICIAN,
  },
  {
    label: "Usuario",
    value: RoleProps.USER,
  },
];