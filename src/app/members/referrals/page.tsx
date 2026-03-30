'use client'

import { useState, use } from 'react'
import { getMockReferralData } from '@/lib/mock-data/referral'
import ReferralCenter from '@/components/ReferralCenter'

type DemoAffiliateState = 'active' | 'not_joined' | 'pending'

function JoinCTA() {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="fade-in" style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
      <h1 style={{ marginBottom: '0.75rem' }}>Earn with Positives</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 360, margin: '0 auto 1.5rem' }}>
        Refer friends and earn 20% recurring commission for as long as they stay subscribed.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem',
        marginBottom: '2rem', textAlign: 'center',
      }}>
        {[
          { value: '20%', label: 'Recurring commission' },
          { value: '$10', label: 'Per referral/mo.' },
          { value: '$120', label: 'Per annual referral' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary btn-lg"
        style={{ minWidth: 220 }}
        onClick={() => setClicked(true)}
        disabled={clicked}
        aria-label="Apply to become an affiliate"
      >
        {clicked ? '✓ Application Sent' : 'Apply to Become an Affiliate'}
      </button>
      {clicked && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          We&apos;ll review your application and send you access within 24 hours.
        </p>
      )}

      <div className="divider" />
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        2-tier program · Paid monthly via PayPal or bank transfer · $50 minimum payout
      </p>
    </div>
  )
}

function PendingState() {
  return (
    <div className="fade-in" style={{ padding: '3rem 0', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
      <h1 style={{ marginBottom: '0.75rem' }}>Application Pending</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: 360, margin: '0 auto' }}>
        Your affiliate application is under review. We&apos;ll email you within 24 hours once you&apos;re approved.
      </p>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
// Next.js 15+ requires searchParams to be awaited/unwrapped with React.use()
// in Server Components. This is a Client Component, so we accept the Promise
// and unwrap it properly.

export default function ReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string }> | { demo?: string }
}) {
  // Handle both Next.js 15+ (Promise) and older (plain object) searchParams
  const resolvedParams = typeof (searchParams as Promise<{ demo?: string }>)?.then === 'function'
    ? use(searchParams as Promise<{ demo?: string }>)
    : (searchParams as { demo?: string })

  const demoParam = resolvedParams?.demo

  const stateMap: Record<string, DemoAffiliateState> = {
    affiliate: 'active',
    pending:   'pending',
  }
  const demoAffiliateState: DemoAffiliateState = (demoParam && stateMap[demoParam]) || 'not_joined'

  if (demoAffiliateState === 'active') {
    const data = getMockReferralData('Jane')
    return <ReferralCenter data={data} />
  }

  if (demoAffiliateState === 'pending') {
    return <PendingState />
  }

  return <JoinCTA />
}
