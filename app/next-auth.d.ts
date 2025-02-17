import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      image: string;
    };
  }

  interface User {
    role: string;
    image: string;
  }
}
