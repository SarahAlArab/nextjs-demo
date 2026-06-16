import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/login'];

function getLoginUrl(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();

  loginUrl.pathname = '/login';
  loginUrl.search = '';

  loginUrl.searchParams.set(
    'from',
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return loginUrl;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(getLoginUrl(request));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
