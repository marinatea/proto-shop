'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import router from 'next/router';
import Spinner from '@/components/shared/spinner';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('github', {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/user/user`
      });
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      if (session.user.role === 'admin') {
        router.push('/admin/admin');
      } else if (session.user.role === 'user') {
        router.push('/user/user');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner/>
      </div>
    );
  }

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
          <Button className="w-full" onClick={handleSignIn}>
            Sign in with GitHub
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
