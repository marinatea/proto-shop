// types/next-auth.d.ts

import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    role?: string;
  }
}