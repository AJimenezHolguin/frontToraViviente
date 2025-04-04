import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { RoleProps } from "@/types/roles.enum";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: RoleProps;
      playList: [];
      token: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    role: RoleProps;
    playList: [];
    token: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: RoleProps;
    playList: [];
    token: string;
  }
}