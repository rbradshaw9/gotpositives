import Link from 'next/link'

export default function AdminPage() {
  const stats = [
    { value: '—', label: 'Active Members', icon: '👥' },
    { value: '—', label: 'MRR', icon: '💳' },
    { value: '—', label: 'Content Items', icon: '📚' },
    { value: '—', label: 'Community Posts', icon: '💬' },
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Platform overview — connect Supabase to see live data
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'var(--surface-card)', borderRadius: '12px',
            border: '1px solid var(--surface-border)',
            padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{s.icon}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link href="/admin/library/new" className="btn btn-primary btn-sm">+ Add Content</Link>
        <Link href="/admin/library" className="btn btn-outline btn-sm">Manage Library</Link>
        <Link href="/admin/members" className="btn btn-outline btn-sm">View Members</Link>
      </div>
    </div>
  )
}
