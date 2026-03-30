'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Home, Library, Users, Target } from 'lucide-react'

/* ─── Icons ─────────────────────────────────────────────────── */
function HomeIcon({ active }: { active?: boolean }) {
  return <Home size={22} strokeWidth={active ? 2.5 : 2} color={active ? 'var(--brand-teal)' : 'currentColor'} />
}
function LibraryIcon({ active }: { active?: boolean }) {
  return <Library size={22} strokeWidth={active ? 2.5 : 2} color={active ? 'var(--brand-teal)' : 'currentColor'} />
}
function CommunityIcon({ active }: { active?: boolean }) {
  return <Users size={22} strokeWidth={active ? 2.5 : 2} color={active ? 'var(--brand-teal)' : 'currentColor'} />
}
function PracticeIcon({ active }: { active?: boolean }) {
  return <Target size={22} strokeWidth={active ? 2.5 : 2} color={active ? 'var(--brand-teal)' : 'currentColor'} />
}

const NAV_ITEMS = [
  { href: '/members',           label: 'Home',      Icon: HomeIcon,      exact: true },
  { href: '/members/library',   label: 'Library',   Icon: LibraryIcon,   exact: false },
  { href: '/members/community', label: 'Community', Icon: CommunityIcon, exact: false },
  { href: '/members/practice',  label: 'My Practice', Icon: PracticeIcon, exact: false },
]

export default function MembersNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const demo = searchParams.get('demo')
  const demoSuffix = demo ? `?demo=${demo}` : ''

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Desktop top nav ─────────────────────────────────────── */}
      <nav
        className="nav"
        style={{ borderBottom: '1px solid var(--surface-border)' }}
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          <Link href={`/members${demoSuffix}`} className="nav__logo" aria-label="Positives home" style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
            Positives<span style={{ fontSize: '0.5rem', verticalAlign: 'super', fontStyle: 'normal' }}>™</span>
          </Link>
          <div className="nav__links" role="list">
            {NAV_ITEMS.map(({ href, label, Icon, exact }) => {
              const active = isActive(href, exact)
              return (
                <Link
                  key={href}
                  href={`${href}${demoSuffix}`}
                  className={`nav__link${active ? ' active' : ''}`}
                  role="listitem"
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon active={active} />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* ── Mobile bottom tab bar ────────────────────────────────── */}
      <nav
        className="mobile-tab-bar"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map(({ href, label, Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={`${href}${demoSuffix}`}
              className={`mobile-tab-bar__item${active ? ' active' : ''}`}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
            >
              <Icon active={active} />
              <span className="mobile-tab-bar__label">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
