import { SidebarMenuItem } from "@/shared/components/SidebarMenuItem";
import { menuItems } from "@/shared/constants/menuItems";
import Image from "next/image";
import Link from "next/link";
import { IoBookOutline } from "react-icons/io5";

export const Sidebar = () => {
  return (
    <div
      id="menu"
      className=" w-[400px] bg-gray-900 min-h-screen z-10 text-slate-300 left-0 h-screen overflow-y-scroll"
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
          <IoBookOutline className="mr-2" />
          <span>Tora viviente</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Gestiona tus acciones y actividades
        </p>
      </div>
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <Link href="#" className="inline-flex space-x-2 items-center">
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
      <div id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
