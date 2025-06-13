// app/[role]/user/layout.tsx

import Providers from 'app/providers';

export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex flex-col min-h-screen w-full bg-muted/40">
        <div className="flex-1">{children}</div>
      </main>
    </Providers>
  );
}
