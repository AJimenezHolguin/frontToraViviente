// shared/context/AlertContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AlertComponent } from "@/shared/components/Alert";
import { Colors } from "@/types/color.enum";



type AlertContextProps = {
  showAlert: (params: {
    title: string;
    description: string;
    color?:Colors;
  }) => void;
};

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<Colors>();


  const showAlert = ({
    title,
    description,
    color,
  
  }: {
    title: string;
    description: string;
    color?: Colors;
    // variant: "solid" | "bordered" | "flat" | "faded"; 
  }) => {
    setTitle(title);
    setDescription(description);
    setColor(color);
    setVisible(true);
  
  };

  const handleClose = () => setVisible(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertComponent
        title={title}
        description={description}
        color={color}
        isVisible={visible}
        onClose={handleClose}
        variant={"faded"}
      />
    </AlertContext.Provider>
  );
};
