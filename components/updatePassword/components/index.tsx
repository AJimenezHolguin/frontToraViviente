"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const UpdatePassword = () => {
    
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col font-[Plus_Jakarta_Sans]">
        
        {/* Main */}
        <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
          
          {/* Background */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
  
          <div className="w-full max-w-md z-10">
            
            {/* Header Form */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 p-1 rounded-full border-2 border-primary-container/20 overflow-hidden">
                
                  <Image
                    alt="Tora-Viviente"
                    height={100}
                    src={"/logo-torah-viviente-2.png"}
                    width={100}
                  />
                </div>
  
                <h1 className="text-4xl font-extrabold text-primary-container">
                  Actualizar Contraseña
                </h1>
  
                <p className="text-secondary font-medium px-4">
                  Asegura tu cuenta con una nueva clave de acceso.
                </p>
              </div>
            </div>
  
            {/* Form */}
            <div className="bg-surface-container-lowest rounded-xl shadow p-8 md:p-10 border border-outline-variant/15">
              <form className="space-y-6">
                
                {/* Password */}
                <div>
                  <label htmlFor="new-password" className="text-sm font-semibold ml-1">
                    Contraseña nueva
                  </label>
  
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                      lock
                    </span>
  
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 rounded-lg bg-surface-container-low focus:ring-2 focus:ring-secondary outline-none"
                    />
  
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </button>
                  </div>
                </div>
  
                {/* Confirm */}
                <div>
                  <label htmlFor="confirm-password" className="text-sm font-semibold ml-1">
                    Confirmar nueva contraseña
                  </label>
  
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                      lock
                    </span>
  
                    <input
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 rounded-lg bg-surface-container-low focus:ring-2 focus:ring-secondary outline-none"
                    />
  
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {showConfirm ? "visibility_off" : "visibility"}
                    </button>
                  </div>
                </div>
  
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#a73a05] to-[#ff7a45] text-white font-bold rounded-full shadow-lg hover:opacity-90 active:scale-95 transition"
                >
                  Actualizar →
                </button>
  
                {/* Cancel */}
                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-secondary text-sm hover:text-primary"
                  >
                    Cancelar y volver al inicio
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
    
}