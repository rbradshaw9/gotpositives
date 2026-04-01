import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const pathname = request.nextUrl.pathname

  // ── BYPASS / PREVIEW MODE ─────────────────────────────────────────────────
  // Skip all auth gating when NEXT_PUBLIC_BYPASS_AUTH=true (preview deployments)
  // or when Supabase is not yet connected.
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' || !supabaseUrl || !supabaseKey) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()

  const isMembersRoute = pathname.startsWith('/members')
  const isAdminRoute = pathname.startsWith('/admin')

  // ── RULE 1: Auth gate — /members/* and /admin/* ───────────────────────────
  if ((isMembersRoute || isAdminRoute) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // ── RULE 2: Subscription gate — /members/* ────────────────────────────────
  if (isMembersRoute && user) {
    const { data: member } = await supabase
      .from('member')
      .select('subscription_status')
      .eq('id', user.id)
      .single()

    const isActive =
      member?.subscription_status === 'active' ||
      member?.subscription_status === 'trialing'

    if (!isActive) {
      const url = request.nextUrl.clone()
      url.pathname = '/subscribe'
      url.searchParams.set('reason', member?.subscription_status ?? 'no_subscription')
      return NextResponse.redirect(url)
    }
  }

  // ── RULE 3: Admin gate — require admin role ───────────────────────────────
  if (isAdminRoute && user) {
    const { data: member } = await supabase
      .from('member')
      .select('role')
      .eq('id', user.id)
      .single()

    if (member?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/members'
      return NextResponse.redirect(url)
    }
  }

  // ── RULE 4: Redirect logged-in users away from /login ─────────────────────
  if (pathname === '/login' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/members'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
