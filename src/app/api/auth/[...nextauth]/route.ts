import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios.");
        }

        // Validação de credenciais (idealmente, use um banco de dados)
        if (
          credentials.email === "admin@doubletelecom.com.br" &&
          credentials.password === "123456789"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@doubletelecom.com.br",
          };
        }

        // Retorna null se as credenciais estiverem incorretas
        return null;
      },
    }),
  ],
});
export { handler as GET, handler as POST };