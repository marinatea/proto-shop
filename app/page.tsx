// app/page.tsx
'use client';

import { Suspense } from 'react';
import PublicPage from './public-page/page';
import Header from '@/components/shared/header';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicPage />
    </Suspense>
  );
}
