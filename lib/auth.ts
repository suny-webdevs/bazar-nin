import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma"
import { verifyPassword } from "@/utils"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) throw new Error("User not found")

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )
        if (!isValid) throw new Error("Invalid password")

        return user
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.role = user.role ?? "USER"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email!
        session.user.role = token.role
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
}

export const auth = () => getServerSession(authOptions)
