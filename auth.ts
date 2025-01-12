import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Resend({
      from: process.env.AUTH_RESEND_FROM,
      apiKey: process.env.AUTH_RESEND_KEY,
    }),
  ],
})