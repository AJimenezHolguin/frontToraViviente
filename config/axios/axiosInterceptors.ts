import { AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";
import { HTTP_STATUS } from "./constanst";
import { eventBus } from "@/shared/utils/eventBus";

const excludedRoutes = ["/auth/login", "/auth/register"];
const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config) => {
      const isExcluded = excludedRoutes.some((route) =>
        config.url?.includes(route)
      );

      // Solo obtiene sesión si no está en rutas excluidas
      if (!isExcluded) {
        const session = await getSession();
        const token = session?.user?.token;

        if (!token) {
          if (typeof window !== "undefined") {
            eventBus.emit("tokenExpired");
            // await signOut({ callbackUrl: "/login" });
            //window.location.href ="/login"
          }

          return Promise.reject(new Error("Sesión expirada"));
        }
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === HTTP_STATUS.NOT_TOKEN) {
        if (typeof window !== "undefined") {
          eventBus.emit("tokenExpired");
          // await signOut({ callbackUrl: "/login" });
          //window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
};

export default applyInterceptors;
