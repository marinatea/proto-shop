// app/[role]/user/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function UserDashboard() {
  const { data: session } = useSession();
  const params = useParams();

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center p-8">
      <h1 className="text-2xl font-bold">Welcome to your dashboard, {session?.user?.name || 'User'}!</h1>
      <div>
        <h2 className="text-xl">Debug info:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify({ 
            params,
            session: {
              user: session?.user,
              expires: session?.expires
            }
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}