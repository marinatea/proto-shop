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

  // Jeśli użytkownik jest już zalogowany, przekieruj go na odpowiednią stronę
  if (status === 'authenticated') {
    // Jeśli użytkownik jest adminem, przekieruj go do /admin
    if (session.user?.role === 'admin') {
      router.push('/admin');
    } else {
      // Jeśli użytkownik jest zwykłym użytkownikiem, przekieruj go do /user
      router.push('/user');
    }
  }

  const handleLogin = async () => {
    // Zaloguj się przez GitHub
    await signIn('github', {
      callbackUrl: await getRedirectUrl()
    });
  };

  const getRedirectUrl = async () => {
    // W przypadku, gdy użytkownik jest zalogowany, ale nie ma roli
    // W tym przypadku, powinniśmy zwrócić odpowiednią stronę na podstawie roli
    const user = await fetchUserFromSession(); // Funkcja do pobrania danych użytkownika

    if (user?.role === 'admin') {
      return '/admin';  // Jeśli admin, przekieruj do /admin
    }

    return '/user'; // Jeśli zwykły użytkownik, przekieruj do /user
  };

  // Funkcja do pobrania danych użytkownika
  const fetchUserFromSession = async () => {
    // Możesz to zrobić na przykład za pomocą requesta do API lub tokena z NextAuth
    // Poniżej przykładowa logika, jeśli masz taką strukturę:
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
              // Przeprowadź logowanie przez GitHub
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
