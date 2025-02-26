// app/[role]/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function RoleDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const role = params.role as string;

  useEffect(() => {
    if (role === 'user') {
      router.push(`/${role}/user/dashboard`);
    } else if (role === 'admin') {
      router.push(`/${role}/admin/dashboard`);
    }
  }, [role, router]);

  return <div>Redirecting to your dashboard...</div>;
}