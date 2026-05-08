import { UserRole } from "@/services/users/types";


export const roleOptions = Object.values(UserRole).map(
  (role) => ({
    label: role,
    value: role,
  })
);