import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Auth middleware — currently in PREVIEW MODE (pass-through).
 * All routes are accessible without login.
 * To re-enable auth, restore the updateSession logic from git history.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
