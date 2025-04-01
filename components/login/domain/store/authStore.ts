import { create } from "zustand";

import { AuthData } from "../models/user";

const getInitialState = (): AuthData => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("authData");
    return storedData ? JSON.parse(storedData) : {  token: null };
  }
  return { token: null };
};

interface AuthState extends AuthData {
  setAuth: (authData: AuthData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  setAuth: (authData) => {
    localStorage.setItem("authData", JSON.stringify(authData));
    set(authData);
  },

  logout: () => {
    localStorage.removeItem("authData");
    set({ token: null });
  },
}));
