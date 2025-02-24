import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    role: string;
  };
};

export default async function RoleLayout({ params }: Props) {
  const { role } = await params; // Czekamy na załadowanie params
  console.log('Role in layout:', role);

  const session = await getServerSession(authOptions);
  console.log('Session:', session);

  return (
    <div>
      <h1>Role: {role}</h1>
      {/* Dalsza logika lub komponenty */}
    </div>
  );
}
