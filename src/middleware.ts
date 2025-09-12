import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeAdmin } from './lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { ADMIN_UID } from './lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('__session')?.value || '';

  try {
    const adminApp = await initializeAdmin();
    const decodedIdToken = await getAuth(adminApp).verifySessionCookie(sessionCookie, true);

    // If user is authenticated and on login page, redirect
    if (pathname === '/login') {
      if (decodedIdToken.uid === ADMIN_UID) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If trying to access admin but is not the admin user, redirect
    if (pathname.startsWith('/admin')) {
      if (decodedIdToken.uid !== ADMIN_UID) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    
  } catch (error) {
    // If cookie is invalid or not present and they are trying to access a protected admin route
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
    // Run middleware on all paths except for static files and API routes
    matcher: ['/admin/:path*', '/login'],
    runtime: 'nodejs',
};
