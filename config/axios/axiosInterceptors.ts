import { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

import { eventBus } from "@/shared/utils/eventBus";
import { HTTP_STATUS } from "./constanst";
import { eventBus } from "@/shared/utils/eventBus";

const excludedRoutes = ["/auth/login", "/auth/register"];
const applyInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config) => {
      const isExcluded = excludedRoutes.some((route) =>
        config.url?.includes(route)
      );

      if (!isExcluded) {
        const session = await getSession();
        const token = session?.user?.token;

        if (!token) {
          if (typeof window !== "undefined") {
            eventBus.emit("tokenExpired");
          }

          return Promise.reject({
            response: {
              status: 401,
              data: { message: "Sesión expirada" }
            },
          })
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
      const status = error.response?.status;

      if (status === HTTP_STATUS.UNAUTHORIZED) {
        if (typeof window !== "undefined") {
          eventBus.emit("tokenExpired");
        }
      }

      return Promise.reject(error);
    }
  );
};

export default applyInterceptors;
