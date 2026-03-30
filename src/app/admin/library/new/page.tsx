'use client'

import { useState } from 'react'
import Link from 'next/link'

const CONTENT_TYPES = [
  { value: 'daily_audio', label: '🎧 Daily Audio' },
  { value: 'weekly_principle', label: '📋 Weekly Principle' },
  { value: 'monthly_theme', label: '🌕 Monthly Theme' },
  { value: 'course', label: '📚 Course' },
  { value: 'workshop', label: '🎬 Workshop' },
]

export default function NewContentPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: '', type: 'daily_audio', description: '',
    mux_asset_id: '', castos_episode_url: '', pdf_url: '',
    month_theme: '', tags: '', duration_seconds: '', is_active: true,
  })

  function update(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    console.log('Save content:', form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/library" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
          ← Library
        </Link>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700 }}>Add Content</h1>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Type */}
        <Field label="Content Type" required>
          <select
            value={form.type}
            onChange={e => update('type', e.target.value)}
            style={inputStyle}
          >
            {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>

        {/* Title */}
        <Field label="Title" required>
          <input
            type="text" placeholder="Morning Ground" value={form.title}
            onChange={e => update('title', e.target.value)}
            style={inputStyle} required
          />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea
            placeholder="Short description shown in the Library…"
            value={form.description}
            onChange={e => update('description', e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </Field>

        {/* Mux */}
        <Field label="Mux Asset ID" hint="From the Mux dashboard — for video content">
          <input
            type="text" placeholder="abc123xyz" value={form.mux_asset_id}
            onChange={e => update('mux_asset_id', e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Castos */}
        <Field label="Castos Episode URL" hint="Private podcast RSS episode URL">
          <input
            type="url" placeholder="https://feeds.castos.com/…" value={form.castos_episode_url}
            onChange={e => update('castos_episode_url', e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* PDF */}
        <Field label="PDF URL" hint="Supabase Storage URL or external link">
          <input
            type="url" placeholder="https://…/guide.pdf" value={form.pdf_url}
            onChange={e => update('pdf_url', e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Duration */}
        <Field label="Duration (seconds)" hint="e.g. 420 for 7 minutes">
          <input
            type="number" placeholder="420" value={form.duration_seconds}
            onChange={e => update('duration_seconds', e.target.value)}
            style={inputStyle} min={0}
          />
        </Field>

        {/* Month theme */}
        <Field label="Monthly Theme" hint="e.g. March: Stillness — connects this content to a monthly theme">
          <input
            type="text" placeholder="March: Stillness" value={form.month_theme}
            onChange={e => update('month_theme', e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Tags */}
        <Field label="Tags" hint="Comma-separated: grounding, morning, breath">
          <input
            type="text" placeholder="grounding, morning, breath" value={form.tags}
            onChange={e => update('tags', e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Publish toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <label style={{ position: 'relative', width: 40, height: 22, cursor: 'pointer' }}>
            <input
              type="checkbox" checked={form.is_active}
              onChange={e => update('is_active', e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '999px',
              background: form.is_active ? 'var(--brand-teal)' : 'var(--surface-muted)',
              transition: 'background 200ms',
            }} />
            <span style={{
              position: 'absolute', top: '3px',
              left: form.is_active ? '21px' : '3px',
              width: 16, height: 16, borderRadius: '50%',
              background: '#fff', boxShadow: 'var(--shadow-sm)',
              transition: 'left 200ms',
            }} />
          </label>
          <span style={{ fontWeight: 500, fontSize: '0.9375rem' }}>
            {form.is_active ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Save */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="submit" className="btn btn-primary">
            {saved ? '✓ Saved!' : 'Save Content'}
          </button>
          <Link href="/admin/library" className="btn btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

function Field({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
        {label}{required && <span style={{ color: 'var(--status-error)', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{hint}</p>}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.875rem',
  border: '1.5px solid var(--surface-border)', borderRadius: 'var(--radius-md)',
  fontSize: '0.9375rem', fontFamily: 'var(--font-sans)', outline: 'none',
  background: 'var(--surface-card)', color: 'var(--text-primary)',
  transition: 'border-color 150ms',
}
