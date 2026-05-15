import { RoleProps } from "@/types/roles.enum";
import { SidebarMenuItemProps } from "../components/SidebarMenuItem/types"
import { IoCalculator, IoListCircleOutline, IoListOutline, IoMusicalNoteOutline, IoMusicalNotesOutline, IoKeyOutline,IoPersonOutline } from 'react-icons/io5';


export const menuItems: SidebarMenuItemProps[] = [
 
    {
        title: "Control Financiero",
        subTitle: "Registro Contable",
        path: "/dashboard/movements-contable",
        icon: <IoCalculator size={30} />,
        allowedRoles : [RoleProps.ADMIN]
    },
    {
        title: "Mis Playlists",
        subTitle: "Mis Listas",
        path: "/dashboard/my-playlists",
        icon: <IoListCircleOutline size={30} />,
        allowedRoles : [RoleProps.ADMIN, RoleProps.MUSICIAN]
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
        allowedRoles : [RoleProps.ADMIN, RoleProps.MUSICIAN]
    },
    {
        title: "Todas las Canciones",
        subTitle: "Todas las Alabanzas",
        path: "/dashboard/all-songs",
        icon: <IoMusicalNotesOutline size={30} />,
        allowedRoles : [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN]
    },
    {
        title: "Actualizar mi contraseña",
        subTitle: "Mi contraseña",
        path: "/dashboard/update-my-password",
        icon: <IoKeyOutline size={30} />,
        allowedRoles : [RoleProps.USER, RoleProps.ADMIN, RoleProps.MUSICIAN]
    },
    {
        title: "Gestión de usuarios",
        subTitle: "Usuarios del sistema",
        path: "/dashboard/users",
        icon: <IoPersonOutline size={30} />,
        allowedRoles : [RoleProps.ADMIN]
    },

]

