import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@lib/prisma";

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    // Uncomment and customize if needed
    signOut: "/auth/signout",
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.email = token.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure url and baseUrl are defined
      if (!url || !baseUrl) {
        return baseUrl || process.env.NEXTAUTH_URL || "/drafts";
      }

      // Use new URL to properly handle URL checking
      try {
        const redirectUrl = new URL(url);
        const actualBaseUrl = process.env.NEXTAUTH_URL || baseUrl;
        return redirectUrl.origin === actualBaseUrl ? url : actualBaseUrl;
      } catch (error) {
        return baseUrl || process.env.NEXTAUTH_URL || "/";
      }
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
