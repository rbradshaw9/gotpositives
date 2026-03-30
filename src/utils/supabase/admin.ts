import { createClient } from '@supabase/supabase-js'

// This client uses the Service Role Key.
// WARNING: NEVER expose this on the client-side. It bypasses Row Level Security (RLS).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)
