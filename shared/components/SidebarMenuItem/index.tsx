"use client";

import Link from "next/link";
import React from "react";
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
      className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
        ${currentPath === path ? " bg-blue-800" : ""}
        `}
      href={path}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {subTitle}
        </span>
      </div>
    </Link>
  );
};
