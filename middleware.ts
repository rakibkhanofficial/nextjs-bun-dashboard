// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add headers to help debug
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-middleware-request', 'true')
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl
        
        console.log('Middleware check:', {
          pathname,
          hasToken: !!token,
          token: token
        })
        
        // Allow registration (POST to /api/users) without authentication
        if (pathname === '/api/users' && req.method === 'POST') {
          return true
        }
        
        // Allow auth routes
        if (pathname.startsWith('/api/auth/')) {
          return true
        }
        
        // Check specific protected routes
        const protectedRoutes = ['/dashboard', '/api/auth/me']
        const isProtectedRoute = protectedRoutes.some(route => 
          pathname.startsWith(route)
        )
        
        if (isProtectedRoute) {
          if (!token) {
            console.log('Redirecting to login - no token')
            return false
          }
          return true
        }
        
        // For non-protected routes, allow access
        return true
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/users/:path*",
    "/api/auth/me",
  ]
}