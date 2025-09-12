import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { initializeAdmin } from './lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { ADMIN_UID } from './lib/constants';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('__session')?.value || '';

  // Allow static files and API routes to pass through
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    const adminApp = await initializeAdmin();
    const decodedIdToken = await getAuth(adminApp).verifySessionCookie(sessionCookie, true);

    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (decodedIdToken.uid !== ADMIN_UID) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    
    if (request.nextUrl.pathname === '/login' && decodedIdToken) {
        if (decodedIdToken.uid === ADMIN_UID) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.redirect(new URL('/', request.url));
    }

  } catch (error) {
    // If cookie is invalid or not present, redirect to login for protected routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
