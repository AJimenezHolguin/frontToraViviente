import { useAuthStore } from "../store/authStore";
import { RequetsLogin, ResponseLogin } from "../models/user";
import { loginUser } from "../services/auth.service";

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
};
