// app/page.tsx
'use client';

import { Suspense } from 'react';
import PublicPage from './public-page/page';
import Spinner from '@/components/shared/spinner';

export default function Page() {
  return (
    <Suspense fallback={<Spinner/>}>
      <PublicPage />
    </Suspense>
  );
}
