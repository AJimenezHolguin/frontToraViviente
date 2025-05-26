import { AxiosInstance } from "axios";

import { HTTP_STATUS } from "./constanst";
import { getSession } from "next-auth/react";

const excludedRoutes = ["/auth/login", "/auth/register"];

const applyInterceptors = (api: AxiosInstance) => {
  // Interceptor para incluir el token en las solicitudes
  api.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      const token = session?.user?.token;

      const isExcluded = excludedRoutes.some((route) =>
        config.url?.includes(route)
      );

      if (!isExcluded && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para manejar respuestas
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      error.response;

      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );
};

export default applyInterceptors;
