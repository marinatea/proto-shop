'use client';

import { SessionProvider } from 'next-auth/react';
import { TooltipProvider } from '@radix-ui/react-tooltip'; // Import TooltipProvider
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </SessionProvider>
  );
}
