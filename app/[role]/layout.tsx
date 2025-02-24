// app/[role]/layout.tsx
import { ReactNode } from 'react';

type Props = {
  params: { role: string };
  children: ReactNode;
};

export default async function RoleLayout({ params }: Props) {
  const { role } = await params;

  return (
    <div>
      <h1>Welcome, {role}!</h1>
      {/* Reszta komponentu */}
    </div>
  );
}
