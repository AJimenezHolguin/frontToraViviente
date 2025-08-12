import { RoleProps } from "@/types/roles.enum";
import { SidebarMenuItemProps } from "../components/SidebarMenuItem/types"
import { IoListCircleOutline, IoListOutline, IoMusicalNoteOutline, IoMusicalNotesOutline, IoPersonOutline } from 'react-icons/io5';


export const menuItems: SidebarMenuItemProps[] = [
    {
        title: "Mi Perfil",
        subTitle: "Panel de Usuario",
        path: "/dashboard/my-profile",
        icon: <IoPersonOutline size={30} />,
        allowedRoles : [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN]
    },
    {
        title: "Mis Playlists",
        subTitle: "Mis Listas",
        path: "/dashboard/my-playlists",
        icon: <IoListCircleOutline size={30} />,
        allowedRoles : [RoleProps.ADMIN]
    },
    {
        title: "Todas las Playlists",
        subTitle: "Listas de Reproducción",
        path: "/dashboard/all-playlists",
        icon: <IoListOutline size={30} />,
        allowedRoles : [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN]
    },
    {
        title: "Mis Canciones",
        subTitle: "Mis Alabanzas",
        path: "/dashboard/my-songs",
        icon: <IoMusicalNoteOutline size={30} />,
        allowedRoles : [RoleProps.ADMIN]
    },
    {
        title: "Todas las Canciones",
        subTitle: "Todas las Alabanzas",
        path: "/dashboard/all-songs",
        icon: <IoMusicalNotesOutline size={30} />,
        allowedRoles : [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN]
    },

]

