'use client';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    if (session.user?.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/user');
    }
  }

  const handleLogin = async () => {
    await signIn('github', {
      callbackUrl: await getRedirectUrl()
    });
  };

  const getRedirectUrl = async () => {
    const user = await fetchUserFromSession();

    if (user?.role === 'admin') {
      return '/admin';
    }

    return '/user';
  };

  const fetchUserFromSession = async () => {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            action={async () => {
              'use server';
              const result = await signIn('github', {
                callbackUrl: await getRedirectUrl()
              });
            }}
            className="w-full"
          >
            <Button className="w-full">Sign in with GitHub</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
