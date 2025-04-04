import { RequetsLogin, ResponseLogin } from "../models/user";
import { loginUser } from "../services/auth.service";

export const handleLogin = {
  login: async (credentials: RequetsLogin): Promise<ResponseLogin> => {
    const authData = await loginUser.login(credentials);

    return authData;
  },
};
