// app/page.tsx
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { User } from '../types/types';

export default async function Home() {
  const session = await getSession();

  if (session) {
    const user = session.user as User;
    if ((user?.role as string) === 'admin') {
      redirect('/admin');
    } else {
      redirect('/user/dashboard');
    }
  } else {
    redirect('/public/landing');
  }
}
