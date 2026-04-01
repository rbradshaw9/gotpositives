'use client'

import '@/app/globals.css'
import Link from 'next/link'
import { login } from './actions'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginContent() {
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get('error')
    ? decodeURIComponent(searchParams.get('error')!)
    : null

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
      background: 'var(--surface-base)',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Header */}
      <header style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '640px',
        margin: '0 auto',
        width: '100%',
      }}>
        <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          ✦ Positives
        </span>
        <Link href="/subscribe" style={{ fontSize: '0.875rem', color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 500 }}>
          Join →
        </Link>
      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✦</div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Welcome back</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              Sign in to continue your practice.
            </p>
          </div>

          {/* Preview mode badge */}
          {process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && (
            <div style={{
              background: 'rgba(124, 158, 138, 0.1)',
              border: '1px solid rgba(124, 158, 138, 0.35)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.8125rem',
              color: 'var(--brand-teal)',
              marginBottom: '1.25rem',
              textAlign: 'center',
              lineHeight: 1.6,
            }}>
              <strong>Preview mode</strong><br />
              Email: <code>test@positives.com</code><br />
              Password: <code>preview123</code>
            </div>
          )}

          {/* Error banner */}
          {errorMsg && (

            <div style={{
              background: 'rgba(196, 89, 92, 0.1)',
              border: '1px solid rgba(196, 89, 92, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--status-error)',
              marginBottom: '1.25rem',
              textAlign: 'center',
            }}>
              {errorMsg}
            </div>
          )}

          {/* Form card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="hidden" name="remember" value="true" />

              <div>
                <label htmlFor="email-address" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    border: '1.5px solid var(--surface-border)',
                    borderRadius: '10px', fontSize: '1rem',
                    color: 'var(--text-primary)', background: 'var(--surface-base)',
                    outline: 'none', fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                    transition: 'border-color 150ms',
                  }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    Password
                  </label>
                  <a href="#" style={{ fontSize: '0.8125rem', color: 'var(--brand-teal)', textDecoration: 'none' }}>
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    border: '1.5px solid var(--surface-border)',
                    borderRadius: '10px', fontSize: '1rem',
                    color: 'var(--text-primary)', background: 'var(--surface-base)',
                    outline: 'none', fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                    transition: 'border-color 150ms',
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                style={{ marginTop: '0.5rem', padding: '0.875rem' }}
              >
                Sign in
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Not a member yet?{' '}
            <Link href="/subscribe" style={{ color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 500 }}>
              Join Positives →
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
