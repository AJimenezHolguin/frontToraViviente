import { Sidebar } from "@/components/sidebar/components";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="w-full flex justify-between items-center mt-2 px-2">
            <Sidebar /> 
            <Image 
            alt="Tora-Viviente"
            height={25}
            src={"/logo-tora-viviente-sin-fondo.png"}
            width={25}  />  
      </div>
        <div className="mt-[10px] P-2 w-full text-slate-900 px-2">
        { children }
        </div>
    </div>
  );
}
