'use client'

import { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { DemoState } from '@/lib/demo/config'
import { DEMO_STATES } from '@/lib/demo/config'

const STATE_LABELS: Record<DemoState, string> = {
  'subscribed':   '✓ Subscribed',
  'affiliate':    '★ Affiliate',
  'unsubscribed': '✗ Expired',
  'logged-out':   '⊙ Logged Out',
}

export default function DemoBar({ currentState }: { currentState: DemoState }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(true)

  const switchTo = useCallback((state: DemoState) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('demo', state)
    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed', bottom: 90, right: 16, zIndex: 999,
          background: 'var(--brand-charcoal)', color: '#fff',
          border: 'none', borderRadius: '9999px', padding: '0.375rem 0.75rem',
          fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', opacity: 0.8,
        }}
        aria-label="Show demo toolbar"
      >
        DEMO
      </button>
    )
  }

  return (
    <div
      role="region"
      aria-label="Demo mode toolbar"
      style={{
        position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
        zIndex: 999, display: 'flex', alignItems: 'center', gap: '6px',
        background: 'rgba(26, 26, 26, 0.95)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '9999px', padding: '6px 8px 6px 12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        fontSize: '0.75rem', fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap', maxWidth: 'calc(100vw - 2rem)',
        overflowX: 'auto',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: '2px' }}>
        DEMO
      </span>
      {DEMO_STATES.map(state => (
        <button
          key={state}
          onClick={() => switchTo(state)}
          style={{
            background: currentState === state ? 'var(--brand-teal)' : 'rgba(255,255,255,0.1)',
            color: currentState === state ? '#fff' : 'rgba(255,255,255,0.7)',
            border: 'none', borderRadius: '9999px', padding: '5px 10px',
            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 150ms',
          }}
          aria-pressed={currentState === state}
        >
          {STATE_LABELS[state]}
        </button>
      ))}
      <button
        onClick={() => setVisible(false)}
        style={{
          background: 'transparent', color: 'rgba(255,255,255,0.3)',
          border: 'none', borderRadius: '9999px', padding: '5px 8px',
          fontSize: '0.875rem', cursor: 'pointer', lineHeight: 1,
        }}
        aria-label="Hide demo toolbar"
      >
        ×
      </button>
    </div>
  )
}
