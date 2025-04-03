import { create } from "zustand";

import { ResponseLogin } from "../models/user";

const getInitialState = (): ResponseLogin => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("authData");

    return storedData ? JSON.parse(storedData) : { user: null, token: null };
  }

  return { user: null, token: null };
};

interface AuthState extends ResponseLogin {
  setAuth: (authData: ResponseLogin) => void;
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
    set({ user: null, token: null });
  },
}));
