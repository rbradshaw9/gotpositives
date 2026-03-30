'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: '/admin', label: '📊 Dashboard', exact: true },
    { href: '/admin/library', label: '📚 Library' },
    { href: '/admin/members', label: '👥 Members' },
    { href: '/admin/settings', label: '⚙️ Settings' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100dvh', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: 'var(--brand-charcoal)',
        display: 'flex', flexDirection: 'column',
        padding: '1.5rem 0',
      }}>
        <div style={{ padding: '0 1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.75rem' }}>
          <p style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em' }}>✦ Positives</p>
          <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Admin</p>
        </div>
        <nav style={{ flex: 1, padding: '0 0.75rem' }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block', padding: '0.625rem 0.75rem',
                borderRadius: '8px', marginBottom: '0.125rem',
                fontSize: '0.875rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
                transition: 'background 150ms, color 150ms',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.target as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/members" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            ← Back to app
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: 'var(--surface-base)', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
