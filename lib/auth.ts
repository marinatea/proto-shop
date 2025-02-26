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
        // Store the role in the JWT token if available
        token.role = account.providerAccountId === 'admin' ? 'admin' : 'user'; // Adjust the condition as needed
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session
      if (token?.role) {
        session.user.role = token.role as string; // Assign role to session
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Check role and redirect to the appropriate page
      const session = await getSession(); // You need to import and use getSession to get the current session
      if (session?.user?.role === 'admin') {
        return `${baseUrl}/admin/dashboard`;
      } else if (session?.user?.role === 'user') {
        return `${baseUrl}/user/dashboard`;
      }
      return baseUrl; // Default redirect
    },
  },
};

export default NextAuth(authOptions);