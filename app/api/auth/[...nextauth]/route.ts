import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
        // console.log

        try {
          const userResponse = await handleLogin.login({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });
          console.log("response route next auth", userResponse);
          // Si la respuesta no es válida, lanzamos un error

          if (!userResponse || !userResponse.token || !userResponse.user) {
            throw new Error("Login fallido");
          }

          return {
            id: userResponse.user.id,
            name: userResponse.user.name,
            email: userResponse.user.email,
            role: userResponse.user.role,
            playList: userResponse.user.playList,
            token: userResponse.token 
          };
          
        } catch (error) {
          console.error("Error en la autenticación:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Primera vez que se inicia sesión (user existe)
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.playList = user.playList;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos los datos del token a la sesión
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        playList: token.playList,
        token: token.token
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
