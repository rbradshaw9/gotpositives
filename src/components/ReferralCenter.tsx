'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, AlertCircle, Clock, Copy, Check, Hash, 
  ExternalLink, ChevronDown 
} from 'lucide-react'
import type { ReferralDashboardData } from '@/types/referral'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

// ─── Referral Link Card ──────────────────────────────────────────────────────

function ReferralLinkCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  return (
    <motion.div variants={itemVariants} className="card" style={{ marginBottom: '1.25rem' }}>
      <h4 style={{ marginBottom: '0.25rem' }}>Your Referral Link</h4>
      <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
        Share this link. When someone subscribes through it, you earn a commission on every payment.
      </p>
      <div className="copy-field">
        <input
          id="referral-link-input"
          type="text"
          readOnly
          value={link}
          aria-label="Your referral link"
          onFocus={e => e.target.select()}
        />
        <button onClick={handleCopy} aria-label={copied ? 'Link copied' : 'Copy link'} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
        <a
          href={`https://twitter.com/intent/tweet?text=I've been doing daily audio grounding with Positives — a gym for personal growth. Join me 👇&url=${encodeURIComponent(link)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
          aria-label="Share on Twitter/X"
        >
          Share on X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
          aria-label="Share on Facebook"
        >
          Share on Facebook
        </a>
      </div>
    </motion.div>
  )
}

// ─── Stats Grid ──────────────────────────────────────────────────────────────

function StatsGrid({ data }: { data: ReferralDashboardData }) {
  const stats = [
    { label: 'Link Clicks',     value: data.clicks },
    { label: 'Signups',         value: data.leads },
    { label: 'Paid Members',    value: data.paidConversions },
    { label: 'Earned',          value: `$${data.commissionsEarned.toFixed(2)}` },
    { label: 'Paid Out',        value: `$${data.commissionsPaid.toFixed(2)}` },
    { label: 'Override Earned', value: `$${data.recruiterOverrideEarned.toFixed(2)}` },
  ]
  return (
    <motion.div variants={itemVariants} style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.625rem',
      marginBottom: '1.25rem',
    }}>
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-card__value">{s.value}</div>
          <div className="stat-card__label">{s.label}</div>
        </div>
      ))}
    </motion.div>
  )
}

// ─── Status Card ─────────────────────────────────────────────────────────────

function AffiliateStatusCard({ data }: { data: ReferralDashboardData }) {
  const statusMap = {
    active:    { label: 'Active Affiliate', badgeClass: 'badge-active' },
    pending:   { label: 'Approval Pending', badgeClass: 'badge-pending' },
    not_joined:{ label: 'Not Yet Joined',   badgeClass: 'badge-inactive' },
  }
  const status = statusMap[data.affiliateStatus]

  const payoutMap = {
    configured:    { label: 'Payout method configured', icon: <CheckCircle2 size={16} color="var(--brand-teal)" /> },
    pending_setup: { label: 'Set up payout method', icon: <AlertCircle size={16} color="var(--status-warning)" /> },
    processing:    { label: 'Payout processing', icon: <Clock size={16} color="var(--status-warning)" /> },
  }
  const payout = payoutMap[data.payoutStatus]

  return (
    <motion.div variants={itemVariants} className="card" style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
        <h4>Affiliate Status</h4>
        <span className={`badge ${status.badgeClass}`}>{status.label}</span>
      </div>
      <div className="divider" style={{ margin: '0 0 0.875rem' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
        <div>
          <span className="text-muted">Payout method</span><br/>
          <span style={{ fontWeight: 500, marginTop: '0.125rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            {payout.icon} {payout.label}
          </span>
        </div>
        {data.lastPayoutDate && (
          <div style={{ textAlign: 'right' }}>
            <span className="text-muted">Last payout</span><br/>
            <span style={{ fontWeight: 500, marginTop: '0.125rem', display: 'block' }}>
              {new Date(data.lastPayoutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Manage Button ───────────────────────────────────────────────────────────

function ManageAffiliateButton() {
  async function handleClick() {
    const res = await fetch('/api/rewardful/sso')
    if (res.ok) {
      const { url } = await res.json()
      if (url) window.location.href = url
    } else {
      // Pending connection — alert for now
      alert('Affiliate portal not yet connected. Please check back soon.')
    }
  }

  return (
    <motion.button
      variants={itemVariants}
      className="btn btn-primary btn-full btn-lg"
      onClick={handleClick}
      aria-label="Manage your affiliate account in Rewardful"
      style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
    >
      <ExternalLink size={18} />
      Manage Affiliate Account
    </motion.button>
  )
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────

function FaqSection({ items }: { items: ReferralDashboardData['faqItems'] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.div variants={itemVariants} className="card">
      <h4 style={{ marginBottom: '1rem' }}>Program FAQ</h4>
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span>{item.question}</span>
            <ChevronDown 
              size={18} 
              style={{ flexShrink: 0, transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} 
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div 
                id={`faq-answer-${i}`} 
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ReferralCenter({ data }: { data: ReferralDashboardData }) {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '1rem' }}>
      <motion.div variants={itemVariants} style={{ marginBottom: '1.75rem' }}>
        <h1>Referral Center</h1>
        <p style={{ marginTop: '0.375rem', fontSize: '0.9375rem' }}>
          Earn 20% recurring commission for every member you bring in.
        </p>
      </motion.div>

      <ReferralLinkCard link={data.referralLink} />
      <StatsGrid data={data} />
      <AffiliateStatusCard data={data} />
      <ManageAffiliateButton />
      <FaqSection items={data.faqItems} />
    </motion.div>
  )
}
