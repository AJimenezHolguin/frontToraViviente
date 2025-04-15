import { AxiosInstance } from "axios";

import { HTTP_STATUS } from "./constanst";

import { useAuthStore } from "@/components/login/domain/store/authStore";

const excludedRoutes = ["/auth/login", "/auth/register"];

const applyInterceptors = (api: AxiosInstance) => {
  // Interceptor para incluir el token en las solicitudes
  api.interceptors.request.use(
    (config) => {
      const { token } = useAuthStore.getState();

      const isExcluded = excludedRoutes.some((route) =>
        config.url?.includes(route),
      );

      if (!isExcluded && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Interceptor para manejar respuestas
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      error.response;

      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        useAuthStore.getState().logout();
      }

      return Promise.reject(error);
    },
  );
};

export default applyInterceptors;
