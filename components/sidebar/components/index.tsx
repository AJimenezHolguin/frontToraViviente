"use client";

import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { menuItems } from "@/shared/constants/menuItems";
import Image from "next/image";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        className="top-4 left-4 z-20 p-2 bg-primary text-white rounded-full shadow-lg md:right-[410px] transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>
      <div
        className={`
          fixed top-0 left-0 z-10 h-screen w-[300px] bg-primary text-slate-300
          overflow-y-scroll transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
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
            <span>
              <Image
                alt="User Avatar"
                className="rounded-full w-8 h-8"
                height={52}
                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
                width={52}
              />
            </span>
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
      </div>
    </>
  );
};
