import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axiosInstance from "@/config/axios/axiosInstance";
import { handleLogin } from "@/components/login/domain/actions/authActions";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data: user } = await handleLogin.login({ 
            email: credentials?.email,
            password: credentials?.password,
          });

          if (!user || !user.token) throw new Error("Login fallido");
          console.log("Respuesta del backend", user);

          if (user.error) throw user;

          return user;
        } catch (error) {
          console.error("Error en la autenticación:", error);
          throw new Error("Credenciales inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.token;

      return token;
    },
    async session({ session, token }) {
      session.user.token = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
