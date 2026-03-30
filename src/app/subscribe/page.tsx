'use client'

import Link from 'next/link'
import '@/app/globals.css'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

function CheckIcon() {
  return <Check size={18} strokeWidth={2.5} />
}

const BENEFITS = [
  'Daily audio grounding sessions (7–12 min)',
  'Weekly principle with reflection prompts',
  'Monthly theme that ties it all together',
  'Growing library of practices',
  'Mobile-first — works on any device',
  'Cancel anytime — no lock-in',
]

export default function SubscribePage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  const preferredPlan = searchParams.get('plan') ?? 'monthly'

  const statusMessages: Record<string, string> = {
    canceled: 'Your membership has ended. Rejoin to continue your practice.',
    past_due:  'Your last payment didn\'t go through. Update your billing to restore access.',
    no_subscription: 'A Positives membership is required to access this content.',
  }

  const statusMsg = reason ? (statusMessages[reason] ?? null) : null

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100dvh',
      background: 'var(--surface-base)', fontFamily: 'var(--font-sans)',
    }}>
      {/* Header */}
      <header style={{
        padding: '1.25rem 1.5rem', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        maxWidth: '680px', margin: '0 auto', width: '100%',
      }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em' }}>✦ Positives</span>
        <Link href="/login" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none' }}>Sign in</Link>
      </header>

      <motion.main variants={containerVariants} initial="hidden" animate="show" style={{ flex: 1, padding: '1rem 1.5rem 3rem', maxWidth: '680px', margin: '0 auto', width: '100%' }}>

        {/* Status message */}
        {statusMsg && (
          <div style={{
            background: 'rgba(212, 144, 74, 0.1)', border: '1px solid rgba(212, 144, 74, 0.3)',
            borderRadius: '12px', padding: '0.875rem 1rem', marginBottom: '1.5rem',
            fontSize: '0.9rem', color: 'var(--status-warning)', lineHeight: 1.5,
          }}>
            {statusMsg}
          </div>
        )}

        {/* Hero */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✦</div>
          <h1 style={{ fontSize: 'clamp(1.75rem,5vw,2.25rem)', marginBottom: '0.75rem' }}>
            Your daily practice,<br/>finally consistent.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
            Positives is a gym for personal growth. Not a course — a practice.
            You come back every day, and the platform meets you there.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

          {/* Monthly */}
          <div style={{
            background: preferredPlan === 'monthly' ? 'rgba(255, 255, 255, 0.03)' : 'var(--surface-card)',
            backdropFilter: preferredPlan === 'monthly' ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: preferredPlan === 'monthly' ? 'blur(16px)' : 'none',
            border: preferredPlan === 'monthly' ? '2px solid var(--brand-teal)' : '1.5px solid var(--surface-border)',
            borderRadius: '20px', padding: '1.75rem',
            boxShadow: preferredPlan === 'monthly' ? '0 8px 32px rgba(124,158,138,0.2)' : 'none',
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--brand-teal)', marginBottom: '0.75rem' }}>
              Monthly
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>$49</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>/mo</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <s style={{ color: 'var(--text-muted)' }}>$97/mo</s> — 50% founding member rate
            </p>
            <Link
              href="/subscribe?plan=monthly"
              className="btn btn-primary btn-full"
              style={{ display: 'block', textAlign: 'center', padding: '0.875rem', textDecoration: 'none' }}
            >
              Start Monthly
            </Link>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.625rem' }}>
              Cancel anytime
            </p>
          </div>

          {/* Annual */}
          <div style={{
            background: preferredPlan === 'annual' ? 'var(--brand-teal)' : 'var(--surface-card)',
            backdropFilter: preferredPlan === 'annual' ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: preferredPlan === 'annual' ? 'blur(16px)' : 'none',
            border: '1.5px solid transparent',
            borderRadius: '20px', padding: '1.75rem',
            boxShadow: preferredPlan === 'annual' ? '0 8px 32px rgba(124,158,138,0.2)' : 'none',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 14, right: 14,
              color: preferredPlan === 'annual' ? '#fff' : 'var(--brand-teal-dark)',
              padding: '3px 10px', borderRadius: '9999px',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.25)',
            }}>
              Best Value
            </div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: preferredPlan === 'annual' ? 'rgba(255,255,255,0.7)' : 'var(--brand-teal)', marginBottom: '0.75rem' }}>
              Annual
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: preferredPlan === 'annual' ? '#fff' : 'var(--text-primary)' }}>$499</span>
              <span style={{ color: preferredPlan === 'annual' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontSize: '0.9375rem' }}>/yr</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: preferredPlan === 'annual' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: '1.25rem' }}>
              $41.58/mo — save $89 vs monthly
            </p>
            <Link
              href="/subscribe?plan=annual"
              style={{
                display: 'block', textAlign: 'center', padding: '0.875rem',
                background: '#fff', color: 'var(--brand-teal-dark)',
                borderRadius: '9999px', fontWeight: 600, fontSize: '0.9375rem',
                textDecoration: 'none', transition: 'opacity 150ms',
              }}
            >
              Start Annual — Save $89
            </Link>
            <p style={{ fontSize: '0.8125rem', color: preferredPlan === 'annual' ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', textAlign: 'center', marginTop: '0.625rem' }}>
              Cancel anytime
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1875rem', marginBottom: '1rem', textAlign: 'center' }}>What's included</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {BENEFITS.map(b => (
              <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--brand-teal)', flexShrink: 0 }}><CheckIcon /></span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Trust line */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', borderTop: '1px solid var(--surface-border)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            No dark patterns. Self-serve billing portal. Cancel anytime in one click.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
            Already a member?{' '}
            <Link href="/login" style={{ color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 500 }}>Sign in →</Link>
          </p>
        </motion.div>
      </motion.main>
    </div>
  )
}
