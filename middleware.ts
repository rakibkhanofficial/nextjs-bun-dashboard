import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl
        
        // Allow registration (POST to /api/users) without authentication
        if (pathname === '/api/users' && req.method === 'POST') {
          return true // Allow registration without auth
        }
        
        // Allow public API routes
        if (pathname.startsWith('/api/auth/')) {
          return true
        }
        
        // For all other protected routes, require authentication
        return !!token
      },
    },
    pages: {
      signIn: "/login",
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