'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Jeśli użytkownik jest zalogowany, przekieruj go na odpowiednią stronę
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    } else {
      // Jeśli użytkownik nie jest zalogowany, przekieruj na publicpanel
      router.push('/publicpanel');
    }
  }, [session, status, router]);

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-xl font-bold">Public Page</h1>

        <div className="relative">
          <FaUserCircle
            className="text-3xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg">
              {status === 'authenticated' ? (
                <Button
                  onClick={() => signOut({ callbackUrl: '/publicpanel' })}
                >
                  Sign out
                </Button>
              ) : (
                <button
                  onClick={() => signIn('github')}
                  className="block w-full text-left p-2 hover:bg-gray-100"
                >
                  Zaloguj się
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <p>To jest publiczna strona.</p>
      </main>
    </div>
  );
}
