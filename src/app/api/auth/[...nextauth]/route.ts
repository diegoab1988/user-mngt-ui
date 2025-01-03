import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    id?: string;
    
  }
}

const handler = NextAuth({
  pages: {
    signIn: '/', // Página de login personalizada
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("Missing credentials");
          }

          const response = await axios.post(`${process.env.BACKEND_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const { accessToken, loggedUserDto } = response.data;

          if (accessToken && loggedUserDto) {
            return {
              id: loggedUserDto.id,
              name: loggedUserDto.fullname,
              email: loggedUserDto.email,
              token: accessToken, // Inclui o token para uso na sessão
            };
          }

          throw new Error("Invalid credentials");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Erro ao autenticar:", error.message);
            throw new Error(error.response.data?.message || "Falha na autenticação");
          } else {
            console.error("Erro ao autenticar:", error.message);
            throw new Error("Falha na autenticação");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Define a proper type for the user object
      if (user) {
        const typedUser = user as { id: string; token: string };
        token.accessToken = typedUser.token;
        token.id = typedUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Inclui o token JWT na sessão do usuário
      if (session.user) {
        session.user.id = token.id;
      }
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
