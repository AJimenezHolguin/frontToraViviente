import { RoleProps } from "@/types/roles.enum";

export interface User {
  _id?: string;
  __v?: number;
  id: string;
  name: string;
  email: string;
  role: RoleProps;
  playList: [];
  createdAt: string;
  updatedAt: string;
}

export interface RequetsLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string | null;
  user: User | null;
}
