"use client";
import { Sidebar } from "@/components/sidebar/components";
import Image from "next/image";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white relative">
      <div
        className={`w-full h-[60px] flex justify-center items-center ${!isSidebarOpen ? "bg-secondary" : ""}`}
      >
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <div className="fixed top-4 right-4 z-40 sm:pr-2 md:pr-4">
          <Image
            alt="Tora-Viviente"
            height={25}
            src={"/logo-torah-viviente-2.png"}
            width={25}
          />
        </div>
      </div>
      {isSidebarOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      )}
      <div
        className={`mt-[10px] P-2 w-full text-slate-900 px-2 ${isSidebarOpen ? "pointer-events-none" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
