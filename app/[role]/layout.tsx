// app/[role]/layout.tsx
import { ReactNode } from 'react';
import UserLayout from './user/layout';
import AdminLayout from './admin/layout';

type Props = {
  params: { role: string };
  children: ReactNode;
};

export default async function RoleLayout({ params, children }: Props) {
  const resolvedParams = await params; 
  const { role } = resolvedParams;
  return (
    <main className="flex min-h-screen w-full bg-muted/40">
      <div className="flex flex-col items-start justify-start w-full">
        {role === 'user' ? (
          <UserLayout params={resolvedParams}>{children}</UserLayout>
        ) : role === 'admin' ? (
          <AdminLayout params={resolvedParams}>{children}</AdminLayout>
        ) : (
          <div>Access Denied</div>
        )}
      </div>
    </main>
  );
}
