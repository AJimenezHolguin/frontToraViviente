import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/components/login/domain/services/auth.service";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userResponse = await loginUser.login({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });

          if (!userResponse || !userResponse.token || !userResponse.user) {
            throw new Error("Login fallido");
          }

          return {
            id: userResponse.user.id,
            name: userResponse.user.name,
            email: userResponse.user.email,
            role: userResponse.user.role,
            playList: userResponse.user.playList,
            token: userResponse.token,
            createdAt: userResponse.user.createdAt,
            updatedAt: userResponse.user.updatedAt,
          };
        } catch (error) {
          console.error("Error en authorize:", error);

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.playList = user.playList;
        token.token = user.token;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        playList: token.playList,
        token: token.token,
        createdAt: token.createdAt,
        updatedAt: token.updatedAt,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
