"use client";

import { useEffect, useRef } from "react";
import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { menuItems } from "@/shared/constants/menuItems";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { Text } from "@/shared/components/Text";
import { COLORS } from "@/styles/colors";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { data: session } = useSession();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-30  bg-transparent text-white rounded-full md:right-[410px] transition-all duration-300"
        onClick={onToggle}
      >
        {isOpen ? (
          <FiChevronLeft color={COLORS.grey_dark} size={30} />
        ) : (
          <FiChevronRight color={COLORS.grey_dark} size={30} />
        )}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed overflow-y-auto top-0 left-0 z-20 h-screen w-[300px] bg-[#4da699] text-white transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="menu"
      >
        <div className="mt-14 mb-6 ml-6 shrink-0">
          <div className="flex items-center text-lg md:text-2xl">
            <IoBookOutline className="mr-2" color={COLORS.primary} />
            <Text $color={COLORS.primary} $fw={700} $v="h5">
              Tora viviente
            </Text>
          </div>
          <Text $color={COLORS.white} $fw={500} $v="md">
            Gestiona tus acciones y actividades
          </Text>
        </div>

        <div className="px-6 pb-5 shrink-0">
          <Text $color={COLORS.white} $fw={500} $v="md">
            Bienvenido,
          </Text>
          <Link
            className="inline-flex space-x-2 items-center"
            href="#"
            onClick={onToggle}
          >
            <Text $color={COLORS.primary} $fw={600} $v="h5">
              {session?.user?.name
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Text>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar" id="nav">
          {menuItems.map((item) => (
            <div
              key={item.path}
              role="button"
              tabIndex={0}
              onClick={onToggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onToggle();
              }}
            >
              <SidebarMenuItem {...item} />
            </div>
          ))}
        </div>

        <div className="p-6 shrink-0">
          <Link
            className="text-danger text-lg md:text-base font-bold cursor-pointer"
            href={"/login"}
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};
