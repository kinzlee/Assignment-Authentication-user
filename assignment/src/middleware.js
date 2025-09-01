import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  //  access public routes
  const publicRoutes = ['/login', '/register', '/']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // For protected routes, the authentication check is done in the component
  // since middleware cannot access sessionStorage
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

