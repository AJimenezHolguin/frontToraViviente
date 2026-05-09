import { UserRole } from "@/services/users/types";


export const roleOptions = [
  {
    label: "Administrador",
    value: UserRole.ADMIN,
  },
  {
    label: "Músico",
    value: UserRole.MUSICIAN,
  },
  {
    label: "Usuario",
    value: UserRole.USER,
  },
];