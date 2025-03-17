'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/shared/header';

export default function PublicPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin/admin');
      } else {
        router.push('/user/user');
      }
    } else {
      router.push('/');
    }
  }, [session, status, router]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex bg-gray-900 text-white shadow-lg py-4 px-6">
        <p>To jest publiczna strona.</p>
      </main>
    </div>
  );
}
