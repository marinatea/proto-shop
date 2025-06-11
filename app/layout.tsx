// app/layout.tsx

'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Providers } from './providers';
import Header from '@/components/shared/header';
import './globals.css';
import Spinner from '@/components/shared/spinner';
import { Provider } from 'react-redux';
import { store } from './store/store';

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
        <Providers>
          {showHeader ? <Header /> : <Spinner />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
