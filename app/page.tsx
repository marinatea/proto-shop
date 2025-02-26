// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // Użyj roli z sesji lub domyślnie 'user'
      const role = session?.user?.role || 'user';
      console.log('Redirecting to role:', role);
      
      // Przekieruj do odpowiedniej ścieżki z parametrem [role]
      router.push(`/${role}/dashboard`);
    } else if (status === 'unauthenticated') {
      router.push('/publicpanel');
    }
  }, [status, session, router]);

  return <div>Loading...</div>;
}