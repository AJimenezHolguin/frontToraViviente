import { RoleProps } from "@/types/roles.enum";

export const routePermissions: Record<string, RoleProps[]> = {
  "/dashboard/movements-contable": [RoleProps.ADMIN],
  "/dashboard/my-playlists": [RoleProps.ADMIN, RoleProps.MUSICIAN],
  "/dashboard/all-playlists": [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN],
  "/dashboard/my-songs": [RoleProps.ADMIN, RoleProps.MUSICIAN],
  "/dashboard/all-songs": [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN],
};