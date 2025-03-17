// app/page.tsx
'use client';

import { Suspense } from 'react';
import PublicPage from './public-page/page';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublicPage />
    </Suspense>
  );
}
