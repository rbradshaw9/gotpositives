'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ChevronRight, Zap, CreditCard, Bell, Mail, 
  Link as LinkIcon, GraduationCap, ClipboardCheck, Book, Bookmark
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

/* ─── Mock streak calendar ───────────────────────────────── */
function generateHeatmap(): boolean[] {
  // 70 days of mock data — true = practiced that day
  return Array.from({ length: 70 }, (_, i) => {
    if (i > 62) return false // future
    return Math.random() > 0.25 // ~75% completion rate
  })
}
const HEATMAP = generateHeatmap()

function HeatmapDot({ active }: { active: boolean }) {
  return (
    <div style={{
      width: 10, height: 10, borderRadius: 3,
      background: active ? 'var(--brand-teal)' : 'var(--surface-muted)',
      transition: 'background 150ms',
    }} />
  )
}

/* ─── Sections ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'var(--brand-teal)', marginBottom: '0.75rem',
    }}>{children}</p>
  )
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value?: string; href?: string }) {
  const inner = (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.875rem',
      padding: '0.875rem 1.25rem',
      borderBottom: '1px solid var(--surface-border)',
    }}>
      <span style={{ fontSize: '1.125rem', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{label}</span>
      {value && <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{value}</span>}
      {href && <ChevronRight size={18} color="var(--text-muted)" />}
    </div>
  )
  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{inner}</Link>
  return <div>{inner}</div>
}

export default function PracticePage() {
  const streak = 7
  const totalDays = HEATMAP.filter(Boolean).length
  const [tab, setTab] = useState<'overview' | 'journal' | 'saved'>('overview')

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '1rem' }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <motion.header variants={itemVariants} style={{ marginBottom: '1.75rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.625rem',
        }}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', color: '#fff', fontWeight: 700,
          }}>J</div>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.125rem' }}>Jane</h1>
            <p style={{ fontSize: '0.875rem', margin: 0 }}>Member since January 2024</p>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem', marginTop: '1rem' }}>
          {[
            { value: `${streak}`, label: 'Day streak' },
            { value: `${totalDays}`, label: 'Days practiced' },
            { value: '47 hr', label: 'Total time' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.header>

      {/* ── PRACTICE HEATMAP ───────────────────────────── */}
      <motion.section variants={itemVariants} style={{ marginBottom: '2rem' }}>
        <SectionLabel>Practice History — Last 10 Weeks</SectionLabel>
        <div style={{
          background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
          borderRadius: 16, padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: 'repeat(7, 1fr)',
            gap: 4,
          }}>
            {HEATMAP.map((active, i) => <HeatmapDot key={i} active={active} />)}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--surface-muted)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No practice</span>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--brand-teal)', marginLeft: '0.5rem' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Practiced</span>
          </div>
        </div>
      </motion.section>

      {/* ── TAB BAR ────────────────────────────────────── */}
      <motion.div variants={itemVariants} style={{
        display: 'flex', gap: 0, background: 'var(--surface-muted)',
        borderRadius: 'var(--radius-md)', padding: 3, marginBottom: '1.5rem',
      }}>
        {(['overview', 'journal', 'saved'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '0.5rem', border: 'none', cursor: 'pointer',
              borderRadius: 9, fontSize: '0.875rem', fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              background: tab === t ? 'var(--surface-card)' : 'transparent',
              color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
              transition: 'all 150ms',
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* ── OVERVIEW TAB ───────────────────────────────── */}
      {tab === 'overview' && (
        <motion.div variants={itemVariants} key="overview" initial="hidden" animate="show">
          <SectionLabel>Account</SectionLabel>
          <div style={{
            background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
            borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem',
          }}>
            <Row icon={<Zap size={18} />} label="Current Plan" value="Annual · Active" />
            <Row icon={<CreditCard size={18} />} label="Billing & Subscription" href="/members/practice/billing" />
            <Row icon={<Bell size={18} />} label="Notification Preferences" href="/members/practice/notifications" />
            <Row icon={<Mail size={18} />} label="Email Settings" href="/members/practice/email" />
          </div>

          <SectionLabel>More</SectionLabel>
          <div style={{
            background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
            borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem',
          }}>
            <Row icon={<LinkIcon size={18} />} label="Referral Center" href="/members/referrals" />
            <Row icon={<GraduationCap size={18} />} label="Coaching — Learn more" href="/members/practice/coaching" />
            <Row icon={<ClipboardCheck size={18} />} label="CPP Certification" href="/members/practice/cpp" />
          </div>

          <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
            <button
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--status-error)' }}
              onClick={() => alert('Sign out flow — connect Supabase auth')}
            >
              Sign out
            </button>
          </div>
        </motion.div>
      )}

      {/* ── JOURNAL TAB ────────────────────────────────── */}
      {tab === 'journal' && (
        <motion.div variants={itemVariants} key="journal" initial="hidden" animate="show">
          <div style={{
            background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
            borderRadius: 16, padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <Book size={32} color="var(--brand-teal)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Your Private Journal</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              Capture reflections after each practice. Only you can see these.
            </p>
            <button className="btn btn-primary btn-sm">Start a Reflection</button>
          </div>

          {/* Mock journal entries */}
          {[
            { date: 'March 18, 2024', practice: 'Morning Ground', entry: 'Noticed how much tension I carry into the morning before I even look at my phone. The breath work helped reset that.' },
            { date: 'March 15, 2024', practice: 'The Reset', entry: 'Used this after a rough meeting. It actually worked — 7 minutes and I came back calmer than I started.' },
          ].map(j => (
            <div key={j.date} style={{
              background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
              borderRadius: 16, padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
              marginTop: '0.75rem',
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--brand-teal)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                {j.practice}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{j.date}</p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{j.entry}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── SAVED TAB ──────────────────────────────────── */}
      {tab === 'saved' && (
        <motion.div variants={itemVariants} key="saved" initial="hidden" animate="show" style={{
          background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
          borderRadius: 16, padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
          textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <Bookmark size={32} color="var(--brand-teal)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Saved Content</h3>
          <p style={{ fontSize: '0.875rem' }}>
            Bookmark practices and principles to return to later.
          </p>
          <Link href="/members/library" className="btn btn-primary btn-sm" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
            Browse Library
          </Link>
        </motion.div>
      )}

    </motion.div>
  )
}
