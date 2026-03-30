'use client'

import { useState } from 'react'
import Link from 'next/link'

const CONTENT_TYPES = ['daily_audio', 'weekly_principle', 'monthly_theme', 'course', 'workshop'] as const
type ContentType = typeof CONTENT_TYPES[number]

const TYPE_LABELS: Record<ContentType, string> = {
  daily_audio: '🎧 Daily Audio',
  weekly_principle: '📋 Weekly Principle',
  monthly_theme: '🌕 Monthly Theme',
  course: '📚 Course',
  workshop: '🎬 Workshop',
}

// Mock content items — replace with Supabase fetch
const MOCK_ITEMS = [
  { id: '1', title: 'Morning Ground', type: 'daily_audio' as ContentType, status: 'active', duration: '7 min', updated: 'Mar 18' },
  { id: '2', title: 'The Reset', type: 'daily_audio' as ContentType, status: 'active', duration: '9 min', updated: 'Mar 17' },
  { id: '3', title: 'You Don\'t Need to Earn Rest', type: 'weekly_principle' as ContentType, status: 'active', duration: '28 min', updated: 'Mar 11' },
  { id: '4', title: 'March: Stillness', type: 'monthly_theme' as ContentType, status: 'active', duration: '45 min', updated: 'Mar 1' },
  { id: '5', title: 'Foundations of Positives', type: 'course' as ContentType, status: 'draft', duration: '3 hr 20 min', updated: 'Feb 28' },
  { id: '6', title: 'The Reset Toolkit', type: 'workshop' as ContentType, status: 'active', duration: '55 min', updated: 'Feb 15' },
]

export default function AdminLibraryPage() {
  const [filter, setFilter] = useState<ContentType | 'all'>('all')
  const [search, setSearch] = useState('')

  const items = MOCK_ITEMS.filter(i => {
    const matchType = filter === 'all' || i.type === filter
    const matchSearch = search === '' || i.title.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.125rem' }}>Library</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>{items.length} items</p>
        </div>
        <Link href="/admin/library/new" className="btn btn-primary btn-sm">+ Add Content</Link>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 200px', padding: '0.5rem 0.875rem',
            border: '1.5px solid var(--surface-border)', borderRadius: 'var(--radius-md)',
            fontSize: '0.9375rem', fontFamily: 'var(--font-sans)', outline: 'none',
            background: 'var(--surface-card)', color: 'var(--text-primary)',
          }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as ContentType | 'all')}
          style={{
            padding: '0.5rem 0.875rem', border: '1.5px solid var(--surface-border)',
            borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)',
            background: 'var(--surface-card)', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="all">All Types</option>
          {CONTENT_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)', background: 'var(--surface-muted)' }}>
              {['Title', 'Type', 'Duration', 'Status', 'Updated', ''].map(h => (
                <th key={h} style={{
                  padding: '0.625rem 1rem', textAlign: 'left',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{
                borderBottom: i < items.length - 1 ? '1px solid var(--surface-border)' : 'none',
                transition: 'background 150ms',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-muted)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <td style={{ padding: '0.875rem 1rem', fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {item.title}
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {TYPE_LABELS[item.type]}
                  </span>
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {item.duration}
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
                    background: item.status === 'active' ? 'rgba(124,158,138,0.12)' : 'var(--surface-muted)',
                    color: item.status === 'active' ? 'var(--brand-teal-dark)' : 'var(--text-muted)',
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {item.updated}
                </td>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <Link
                    href={`/admin/library/${item.id}`}
                    style={{ fontSize: '0.8125rem', color: 'var(--brand-teal)', fontWeight: 500, textDecoration: 'none' }}
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No content found.
          </div>
        )}
      </div>
    </div>
  )
}
