import { SidebarMenuItemProps } from "../components/SidebarMenuItem/types"
import { IoListCircleOutline, IoListOutline, IoMusicalNotesOutline, IoPersonOutline } from 'react-icons/io5';

export const menuItems:SidebarMenuItemProps[] = [
    {
        title: "Todas las Playlists",
        subTitle: "Listas de Reproducción",
        path: "/dashboard/playlist",
        icon: <IoListOutline size={25}/>,
    },
    {
        title: "Mis Playlist",
        subTitle: "Mis Listas",
        path: "/dashboard/my-playlist",
        icon: <IoListCircleOutline size={25}/>,
    },
    {
        title: "Mi Perfil",
        subTitle: "Panel de Usuario",
        path: "/dashboard/mi-perfil",
        icon: <IoPersonOutline size={25}/>,
    },
    {
        title: "Crear Alabanzas",
        subTitle: "Nueva Alabanza",
        path: "/dashboard/crear-alabanza",
        icon: <IoMusicalNotesOutline size={25}/>,
    },
]

