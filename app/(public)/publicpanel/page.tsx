'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import User from '../../../components/ui/user';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } else {
      router.push('/publicpanel');
    }
  }, [session, status, router]);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-xl font-bold">Public Page</h1>

        <div className="relative">
          <User />
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <p>To jest publiczna strona.</p>
      </main>
    </div>
  );
}
