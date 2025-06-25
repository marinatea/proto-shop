// app/[role]/user/layout.tsx

type Props = {
  params: { role: string };
  children: React.ReactNode;
};

export default async function UserLayout({ params, children }: Props) {
  const resolvedParams = await params;
  const { role } = resolvedParams;

  return (
    <main className="flex flex-col min-h-screen w-full bg-muted/40">
      <div className="flex-1">{children}</div>
    </main>
  );
}
