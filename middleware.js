import { NextResponse } from 'next/server';
import { verifyAccessToken } from './src/lib/auth/jwt.js';

// Define protected routes
const protectedRoutes = [
  '/admin',
  '/api/admin',
  '/api/projects/create',
  '/api/projects/update',
  '/api/projects/delete',
  '/api/contact/admin'
];

const adminRoutes = [
  '/admin',
  '/api/admin'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the route needs protection
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    try {
      // Get token from cookies or Authorization header
      const token = request.cookies.get('najm_access_token')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '');
      
      if (!token) {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Access denied', message: 'No token provided' },
            { status: 401 }
          );
        }
        return NextResponse.redirect(new URL('/login', request.url));
      }
      
      // Verify token
      const decoded = await verifyAccessToken(token);
      
      // Check admin access for admin routes
      if (isAdminRoute && decoded.role !== 'admin') {
        if (pathname.startsWith('/api/')) {
          return NextResponse.json(
            { error: 'Access forbidden', message: 'Admin privileges required' },
            { status: 403 }
          );
        }
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      
      // Add user info to request headers for API routes
      if (pathname.startsWith('/api/')) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', decoded.id);
        requestHeaders.set('x-user-role', decoded.role);
        requestHeaders.set('x-user-email', decoded.email);
        
        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
      
    } catch (error) {
      console.error('Middleware auth error:', error);
      
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Invalid token', message: 'Authentication failed' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/projects/create',
    '/api/projects/update/:path*',
    '/api/projects/delete/:path*',
    '/api/contact/admin/:path*'
  ]
};
