import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    if (token.role === 'admin') {
      if (pathname !== '/admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    } else if (token.role === 'user') {
      if (pathname !== '/user') {
        return NextResponse.redirect(new URL('/user', req.url));
      }
    }

    if (pathname === '/login') {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else {
        return NextResponse.redirect(new URL('/user', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user', '/admin', '/login', '/']
};
