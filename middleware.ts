import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware processing path: ${path}`);

  if (path === '/') {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  console.log('Sesja:', token);

  if (token && (path === '/' || path === '/login')) {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  if (!token) {
    console.log('Brak tokenu - przekierowanie na /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path === '/user/dashboard' || path === '/admin/dashboard') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] // Wyklucza api, next i inne zasoby statyczne
};
