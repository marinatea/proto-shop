// app/layout.tsx

'use client';

import { useEffect, useState, ReactNode } from 'react';
import Header from '@/components/shared/header';
import './globals.css';
import Spinner from '@/components/shared/spinner';
import Providers from './providers';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHeader(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers>
            {showHeader ? <Header /> : <Spinner />}
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
