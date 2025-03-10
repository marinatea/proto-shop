import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { getSession } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.role = account.providerAccountId === 'admin' ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const session = await getSession();
      if (session?.user?.role === 'admin') {
        return `${baseUrl}/admin/admin`;
      } else if (session?.user?.role === 'user') {
        return `${baseUrl}/user/user`;
      }
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);