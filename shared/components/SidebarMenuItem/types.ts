import { RoleProps } from "@/types/roles.enum";

export interface SidebarMenuItemProps {
    title: string;
    subTitle: string;
    icon: JSX.Element;
    path: string;  
    allowedRoles: RoleProps[]; 
}