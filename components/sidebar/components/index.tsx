"use client";

import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { menuItems } from "@/shared/constants/menuItems";

import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <button
        className="top-4 left-4 z-30 p-2 bg-primary text-white rounded-full md:right-[410px] transition-all duration-300"
        onClick={onToggle}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
      <div
        className={`
          fixed top-0 left-0 z-20 h-screen w-[300px] bg-primary text-slate-300
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
          `}
        id="menu"
      >
        <div className="my-12 px-6">
          <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
            <IoBookOutline className="mr-2" id="logo" />
            <span>Tora viviente</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Gestiona tus acciones y actividades
          </p>
        </div>

        <div className="px-6 pb-7" id="profile">
          <p className="text-slate-500">Bienvenido,</p>
          <Link className="inline-flex space-x-2 items-center" href="#">
            <span className="text-sm md:text-base font-bold">
              Anderson Jiménez
            </span>
          </Link>
        </div>

        <div className="w-full px-6" id="nav">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </div>
        <div className="px-6 mt-auto mb-6">
          <Link
            className="text-red-500 cursor-pointer"
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
