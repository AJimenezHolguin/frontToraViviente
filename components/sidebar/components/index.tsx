/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useRef } from "react";
import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { menuItems } from "@/shared/constants/menuItems";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

import { Text } from "@/shared/components/Text";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
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

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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

  const sidebarStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    height: 100vh;
    width: 300px;
    background-color: #4DA699;
    color: #cbd5e0;
    transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
  `;

  return (
    <>
      <button
        className="top-4 left-4 z-30 p-2 bg-transparent text-white rounded-full md:right-[410px] transition-all duration-300"
        onClick={onToggle}
      >
        {isOpen ? <FiChevronLeft size={30} color={COLORS.grey_dark} /> : <FiChevronRight size={30} color={COLORS.grey_dark} />}
      </button>

      <div css={sidebarStyles} ref={sidebarRef} id="menu">
        <div style={{ margin: "80px 0px 25px 25px" }}>
          <div className="flex items-center text-lg md:text-2xl">
            <IoBookOutline className="mr-2" color={COLORS.primary} />
            <Text $v="h5" $fw={700} $color={COLORS.primary}>
              Tora viviente
            </Text>
          </div>
          <Text $v="md" $fw={500} $color={COLORS.white}>
            Gestiona tus acciones y actividades
          </Text>
        </div>

        <div className="px-6 pb-7" id="profile">
          <Text $v="md" $fw={500} $color={COLORS.white}>Bienvenido,</Text>
          <Link className="inline-flex space-x-2 items-center" href="#" onClick={onToggle}>
            <Text $v="h5" $fw={600} $color={COLORS.selected}>
              {session?.user?.name?.split(" ").map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(" ")}
            </Text>
          </Link>
        </div>

        <div className="w-full px-6" id="nav">
          {menuItems.map((item) => (
            <div key={item.path} onClick={onToggle}>
              <SidebarMenuItem {...item} />
            </div>
          ))}
        </div>

        <div className="ml-12 mt-[80px]">
          <Link
            className="text-danger text-lg md:text-base font-bold cursor-pointer"
            href={"/login"}
            onClick={handleLogout}
            style={{ fontSize: "1.25rem" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};
