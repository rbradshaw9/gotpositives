'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// ── Hardcoded preview user ────────────────────────────────────────────────────
// When NEXT_PUBLIC_BYPASS_AUTH=true, these credentials skip Supabase entirely.
const PREVIEW_EMAIL    = 'test@positives.com'
const PREVIEW_PASSWORD = 'preview123'

export async function login(formData: FormData) {
  const email    = formData.get('email') as string
  const password = formData.get('password') as string

  // Preview / local shortcut — no Supabase required
  if (process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true') {
    if (email === PREVIEW_EMAIL && password === PREVIEW_PASSWORD) {
      revalidatePath('/', 'layout')
      redirect('/members')
    }
    redirect('/login?error=Preview mode: use test@positives.com / preview123')
  }

  // Live Supabase login
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/members')
}
