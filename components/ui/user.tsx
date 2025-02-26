'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function User() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/publicpanel');
    }
  }, [session, router, status]);

  if (status === 'loading') return null;

  if (!session) {
    return (
      <Button onClick={() => signIn('github')} variant="outline">
        Sign In with GitHub
      </Button>
    );
  }

  const user = {
    name: session.user?.name || 'Anonymous',
    image: session.user?.image || '/placeholder-user.jpg'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={user.image}
            width={36}
            height={36}
            alt="Avatar"
            className="rounded-full"
            unoptimized
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={async () => {
              await signOut({ callbackUrl: '/publicpanel' });
            }}
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default User;
