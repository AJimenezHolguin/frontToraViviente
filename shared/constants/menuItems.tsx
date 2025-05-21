import { SidebarMenuItemProps } from "../components/SidebarMenuItem/types"
import { IoListCircleOutline, IoListOutline, IoMusicalNoteOutline, IoMusicalNotesOutline, IoPersonOutline } from 'react-icons/io5';

export const menuItems:SidebarMenuItemProps[] = [
    {
        title: "Mi Perfil",
        subTitle: "Panel de Usuario",
        path: "/dashboard/my-profile",
        icon: <IoPersonOutline size={25} />,
    },
    {
        title: "Mis Playlists",
        subTitle: "Mis Listas",
        path: "/dashboard/create-playlist",
        icon: <IoListCircleOutline size={25} />,
    },
    {
        title: "Todas las Playlists",
        subTitle: "Listas de Reproducción",
        path: "/dashboard/all-playlist",
        icon: <IoListOutline size={25} />,
    },
    {
        title: "Mis Alabanzas",
        subTitle: "Mis Alabanzas",
        path: "/dashboard/create-songs",
        icon: <IoMusicalNoteOutline size={25} />,
    },
    {
        title: "Todas las Alabanzas",
        subTitle: "Todas las Canciones",
        path: "/dashboard/all-songs",
        icon: <IoMusicalNotesOutline size={25} />,
    },

]

