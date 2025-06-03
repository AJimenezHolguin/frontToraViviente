"use client";

import Link from "next/link";
import { SidebarMenuItemProps } from "./types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { COLORS } from "@/styles/colors";
export const SidebarMenuItem = ({
  title,
  subTitle,
  path,
  icon,
}: SidebarMenuItemProps) => {
  const currentPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-transparent py-3 transition ease-linear duration-150
      `}
      href={path}
      style={{
        backgroundColor:
          currentPath === path ? COLORS.selected :
            isHovered ? COLORS.hover : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-2`} style={{
        color: currentPath === path ? COLORS.hover : COLORS.selected
      }}>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className={`text-sm`} style={{
          color: "white"
        }
        } > {subTitle}</span>
      </div>
    </Link >
  );
};
