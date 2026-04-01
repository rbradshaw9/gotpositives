import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabaseAdmin: SupabaseClient | null = null

function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Supabase admin env vars are not set')
    // This client uses the Service Role Key.
    // WARNING: NEVER expose this on the client-side. It bypasses Row Level Security (RLS).
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}

// Lazily-evaluated proxy so existing `supabaseAdmin.from(...)` calls still work
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseAdmin() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
