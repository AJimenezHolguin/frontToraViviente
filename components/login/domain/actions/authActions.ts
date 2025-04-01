import { loginUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const handleLogin = async (email: string, password: string) => {
  try {
    const authData = await loginUser(email, password);
    
    useAuthStore.getState().setAuth(authData);
    console.log("Inicio de sesión exitoso actions", authData);
    return authData;
  } catch (error: any) {
    console.error(" Error en el login:", error.message);
    throw error;
  }
};
