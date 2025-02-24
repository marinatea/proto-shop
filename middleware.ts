// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`Middleware processing path: ${path}`);

  // Obsługa ścieżek /user/dashboard i /admin/dashboard
  if (path === '/user/dashboard') {
    const url = request.nextUrl.clone();
    url.pathname = '/user/user/dashboard';
    return NextResponse.rewrite(url);
  }

  if (path === '/admin/dashboard') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/admin/dashboard';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};