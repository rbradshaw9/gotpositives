'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─── Nav Icons ─────────────────────────────────────────────── */
function HomeIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--brand-teal)' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '1.75'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12L12 3L21 12V20C21 20.5523 20.5523 21 20 21H15V16H9V21H4C3.44772 21 3 20.5523 3 20V12Z"/>
    </svg>
  )
}
function HeadphonesIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.25' : '1.75'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V18"/>
      <path d="M21 19C21 20.1046 20.1046 21 19 21H18C16.8954 21 16 20.1046 16 19V16C16 14.8954 16.8954 14 18 14H21V19Z"/>
      <path d="M3 19C3 20.1046 3.89543 21 5 21H6C7.10457 21 8 20.1046 8 19V16C8 14.8954 7.10457 14 6 14H3V19Z"/>
    </svg>
  )
}
function UsersIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.25' : '1.75'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"/>
      <path d="M16 3.13C17.7699 3.58396 19.0078 5.17911 19.0078 7.005C19.0078 8.83089 17.7699 10.426 16 10.88"/>
    </svg>
  )
}
function ShareIcon({ active }: { active?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? '2.25' : '1.75'} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/app',           label: 'Home',    Icon: HomeIcon },
  { href: '/app/listen',   label: 'Listen',  Icon: HeadphonesIcon },
  { href: '/app/community',label: 'Community',Icon: UsersIcon },
  { href: '/app/referrals',label: 'Refer',   Icon: ShareIcon },
]

export default function AppNav() {
  const pathname = usePathname()

  return (
    <nav
      className="nav"
      style={{ borderBottom: '1px solid var(--surface-border)' }}
    >
      <div className="nav__inner">
        {/* Logo */}
        <Link href="/app" className="nav__logo" aria-label="Positives home">
          ✦ Positives
        </Link>

        {/* Nav links */}
        <div className="nav__links" role="list">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive = pathname === href || (href !== '/app' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`nav__link${isActive ? ' active' : ''}`}
                role="listitem"
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon active={isActive} />
                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
