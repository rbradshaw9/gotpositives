import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import MembersNav from '@/components/MembersNav'
import AudioPlayerWrapper from '@/components/AudioPlayerWrapper'
import DemoBar from '@/components/DemoBar'
import { getDemoContext } from '@/lib/demo/config'
import type { DemoState } from '@/lib/demo/config'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Positives — Your Daily Practice',
  description: 'A gym for personal growth. Daily audio grounding, weekly principles, monthly themes.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Positives' },
}

export const viewport: Viewport = {
  themeColor: '#7C9E8A',
  initialScale: 1,
  width: 'device-width',
}

export default async function MembersLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams?: Promise<Record<string, string>> | Record<string, string>
}) {
  let demoParam: string | undefined
  try {
    const resolved = searchParams instanceof Promise ? await searchParams : searchParams
    demoParam = resolved?.demo
  } catch {
    demoParam = undefined
  }

  const demoCtx = getDemoContext(demoParam ?? null)
  const isDemoMode = !!(demoCtx?.active)
  const currentDemoState = (demoCtx?.state ?? 'subscribed') as DemoState

  return (
    <div className="app-shell">
      <MembersNav />

      {isDemoMode && (
        <div style={{
          background: 'linear-gradient(90deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
          padding: '0.375rem 1rem', textAlign: 'center',
          fontSize: '0.6875rem', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          Preview Mode — {currentDemoState}
        </div>
      )}

      <main style={{ flex: 1, paddingTop: '1.5rem', paddingBottom: '5rem' }}>
        <div className="container">
          {children}
        </div>
      </main>

      <AudioPlayerWrapper />

      {isDemoMode && (
        <Suspense>
          <DemoBar currentState={currentDemoState} />
        </Suspense>
      )}
    </div>
  )
}
