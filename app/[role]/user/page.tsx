// app/[role]/user/page.tsx

import UserPanel from './profile/page';

interface PageProps {
  params: Promise<{
    role: string;
  }>;
}

export default async function UserDashboardPage({ params }: PageProps) {
  const { role } = await params;

  // Tu możesz dodać fetch serwerowy jeśli chcesz

  return <UserPanel/>;
}
