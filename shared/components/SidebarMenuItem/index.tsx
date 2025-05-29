"use client";

import Link from "next/link";
import { SidebarMenuItemProps } from "./types";
import { usePathname } from "next/navigation";

export const SidebarMenuItem = ({
  title,
  subTitle,
  path,
  icon,
}: SidebarMenuItemProps) => {
  const currentPath = usePathname();

  return (
    <Link
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-black py-3 hover:bg-white/5 transition ease-linear duration-150
        ${currentPath === path ? " bg-secondary" : ""} 
      `}
      href={path}
    >
      <div className="text-black">{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-black">{title}</span>
        <span className="text-sm text-neutral-800">{subTitle}</span>
      </div>
    </Link>
  );
};
