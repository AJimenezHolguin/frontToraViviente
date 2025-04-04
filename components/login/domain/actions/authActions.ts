import { useAuthStore } from "../store/authStore";
import { RequetsLogin, ResponseLogin } from "../models/user";
import { loginUser } from "../services/auth.service";
import {signIn} from "next-auth/react"

export const handleLogin = {
  login: async (credentials: RequetsLogin): Promise<ResponseLogin> => {
    try {
      const authData = await loginUser.login(credentials);

      useAuthStore.getState().setAuth(authData);

      return authData;
    } catch (error: any) {
      error.message;
      throw error;
    }
  },
  // login: async (credentials: RequetsLogin) => {
  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     email: credentials.email,
  //     password: credentials.password,
  //   });
  //       console.log("esta es la respuesta res:", res )
  //   if (!res || res.error) throw new Error(res?.error || "Login fallido");

  //   return res;
  // },
};
