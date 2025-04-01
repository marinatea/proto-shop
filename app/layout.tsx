// app/layout.tsx
'use client';

import { Providers } from './providers';
import { ReactNode } from 'react';

import Header from '@/components/shared/header';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
