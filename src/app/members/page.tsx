'use client'

import { useState } from 'react'
import { mockDailyAudios, mockWeeklyPrinciple, mockMonthlyTheme } from '@/lib/mock-data/content'

import { AudioLines, Play, ChevronRight, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
}

/* ─── Video Placeholder ────────────────────────────────────── */
function VideoPlaceholder({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      onClick={() => setPlaying(p => !p)}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9
        background: 'linear-gradient(160deg, #1A2820 0%, #0F1A14 100%)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        marginBottom: '1.25rem',
      }}
      role="button"
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
    >
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,158,138,0.08) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(124,158,138,0.18) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'rgba(124,158,138,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 200ms, background 200ms',
          transform: playing ? 'scale(0.95)' : 'scale(1)',
          boxShadow: '0 0 0 8px rgba(124,158,138,0.2)',
        }}>
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ) : <Play fill="currentColor" size={20} />}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
            {title}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
            Monthly Practice Video · Mux
          </p>
        </div>
      </div>
      {/* Duration badge */}
      <div style={{
        position: 'absolute', bottom: '12px', right: '12px',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
        color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', fontWeight: 600,
        padding: '3px 8px', borderRadius: '5px', letterSpacing: '0.02em',
      }}>
        28:00
      </div>
    </div>
  )
}

/* ─── Section Header ───────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: 'var(--brand-teal)',
      marginBottom: '0.625rem',
    }}>{children}</p>
  )
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function AppHomePage() {
  const today = mockDailyAudios[0]
  const streak = 7
  const [isPlayingToday, setIsPlayingToday] = useState(false)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '1rem' }}>

      {/* ── HEADER ──────────────────────────────────── */}
      <motion.header variants={itemVariants} style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontWeight: 600, marginBottom: '0.375rem' }}>Good morning ✦</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--brand-teal)', fontSize: '0.875rem', fontWeight: 500 }}>
          <Flame size={16} strokeWidth={2.5} />
          <span>{streak}-day streak</span>
          <span style={{ color: 'var(--surface-border)', margin: '0 0.25rem' }}>·</span>
          <span style={{ color: 'var(--text-muted)' }}>Keep it going</span>
        </div>
      </motion.header>

      {/* ── TODAY — AUDIO ───────────────────────────── */}
      <motion.section variants={itemVariants} aria-labelledby="today-label" style={{ marginBottom: '2rem' }}>
        <SectionLabel>Today</SectionLabel>

        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--surface-border)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Audio bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1.125rem 1.25rem',
          }}>
            {/* Waveform thumbnail */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AudioLines size={20} color="var(--brand-teal-light)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--brand-teal)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>
                {today.month_theme ?? 'Daily Practice'}
              </p>
              <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 0 }}>
                {today.title}
              </p>
            </div>
            {/* Play button */}
            <button
              onClick={() => setIsPlayingToday(p => !p)}
              style={{
                width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: isPlayingToday ? 'var(--brand-teal-dark)' : 'var(--brand-teal)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 150ms, background 150ms',
                transform: isPlayingToday ? 'scale(0.95)' : 'scale(1)',
              }}
              aria-label={isPlayingToday ? 'Pause' : `Play ${today.title}`}
            >
              {isPlayingToday ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : <Play fill="currentColor" size={20} />}
            </button>
          </div>

          {/* Description strip */}
          <div style={{
            padding: '0 1.25rem 1.125rem',
            borderTop: '1px solid var(--surface-border)',
            paddingTop: '0.875rem',
          }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {today.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              {today.tags?.map(tag => (
                <span key={tag} className="badge badge-active">{tag}</span>
              ))}
              {today.duration_seconds && (
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  {Math.floor(today.duration_seconds / 60)} min
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── THIS WEEK — PRINCIPLE ───────────────────── */}
      <motion.section variants={itemVariants} aria-labelledby="week-label" style={{ marginBottom: '2rem' }}>
        <SectionLabel>This Week</SectionLabel>

        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--surface-border)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.375rem' }}>
                Weekly Principle
              </p>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.35 }}>
                {mockWeeklyPrinciple.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {mockWeeklyPrinciple.description}
              </p>
            </div>
            <div style={{ flexShrink: 0, color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <ChevronRight size={20} />
            </div>
          </div>
          <button
            className="btn btn-outline btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
            aria-label="Open reflection prompts"
          >
            Reflection Prompts
          </button>
        </div>
      </motion.section>

      {/* ── THIS MONTH — VIDEO ──────────────────────── */}
      <motion.section variants={itemVariants} aria-labelledby="month-label">
        <SectionLabel>This Month</SectionLabel>

        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--surface-border)',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.375rem' }}>
              Monthly Theme
            </p>
            <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '0.375rem', lineHeight: 1.35 }}>
              {mockMonthlyTheme.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {mockMonthlyTheme.description}
            </p>
          </div>

          {/* Video embed */}
          <VideoPlaceholder title={mockMonthlyTheme.title} />

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
              Explore This Month
            </button>
            <button className="btn btn-outline btn-sm" aria-label="View archive">
              Archive
            </button>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}
