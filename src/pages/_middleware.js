import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/courses']

export function middleware(req) {
  const isLoggedIn = req?.cookies?.isLoggedIn === 'true'

  if (!isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect('/')
  }
}

// Supports both a single value or an array of matches
export const config = {
  matcher: protectedRoutes
}
