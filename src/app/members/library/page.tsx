'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Play, FileText, Headphones, Video, Library as LibraryIcon } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

/* ─── Types ──────────────────────────────────────────────── */
type ContentType = 'video' | 'audio' | 'pdf'
type FilterKey = 'all' | 'video' | 'audio' | 'pdf' | 'principles' | 'themes'

interface Course {
  id: string
  title: string
  category: string
  description: string
  types: ContentType[]
  modules: number
  duration: string
  gradient: string
  progress: number // 0-100, mock
  filterTags: FilterKey[]
}

/* ─── Mock Data ──────────────────────────────────────────── */
const COURSES: Course[] = [
  {
    id: 'foundations',
    title: 'Foundations of Positives',
    category: 'Course',
    description: 'The complete introduction to the Positives methodology — who it\'s for, why it works, and how to build the practice into your life.',
    types: ['video', 'audio', 'pdf'],
    modules: 8,
    duration: '3 hr 20 min',
    gradient: 'linear-gradient(160deg, #1A2820 0%, #0F1A14 100%)',
    progress: 60,
    filterTags: ['video', 'audio', 'pdf'],
  },
  {
    id: 'march-stillness',
    title: 'March: Stillness',
    category: 'Monthly Theme',
    description: 'This month we explore intentional stillness — not emptiness, but presence. A 28-minute deep-dive video plus daily companion audios.',
    types: ['video', 'audio'],
    modules: 5,
    duration: '1 hr 45 min',
    gradient: 'linear-gradient(160deg, #1B2A28 0%, #0A1A14 100%)',
    progress: 80,
    filterTags: ['video', 'audio', 'themes'],
  },
  {
    id: 'morning-grounding',
    title: 'Morning Grounding Series',
    category: 'Daily Audio',
    description: '30 daily grounding practices, 7–10 minutes each. The heartbeat of the Positives platform — start here.',
    types: ['audio'],
    modules: 30,
    duration: '4 hr 30 min',
    gradient: 'linear-gradient(160deg, #1A2318 0%, #101810 100%)',
    progress: 40,
    filterTags: ['audio'],
  },
  {
    id: 'earn-rest',
    title: 'You Don\'t Need to Earn Rest',
    category: 'Weekly Principle',
    description: 'This week\'s principle is a permission slip. Rest is not a reward — it is a requirement. Practice guide included.',
    types: ['audio', 'pdf'],
    modules: 3,
    duration: '28 min',
    gradient: 'linear-gradient(160deg, #20221A 0%, #141510 100%)',
    progress: 100,
    filterTags: ['audio', 'pdf', 'principles'],
  },
  {
    id: 'reset-toolkit',
    title: 'The Reset Toolkit',
    category: 'Workshop',
    description: 'A live workshop recording. When life disrupts your rhythm, use these 5 tools to come back without judgment.',
    types: ['video', 'pdf'],
    modules: 6,
    duration: '55 min',
    gradient: 'linear-gradient(160deg, #1E1A28 0%, #100F18 100%)',
    progress: 0,
    filterTags: ['video', 'pdf'],
  },
  {
    id: 'cpp-preview',
    title: 'CPP Program — Preview',
    category: 'Certification',
    description: 'An introduction to the Certified Positives Practitioner program. For members considering teaching the methodology.',
    types: ['video'],
    modules: 2,
    duration: '40 min',
    gradient: 'linear-gradient(160deg, #1C2028 0%, #0F1018 100%)',
    progress: 0,
    filterTags: ['video'],
  },
]

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'video',      label: '🎬 Video' },
  { key: 'audio',      label: '🎧 Audio' },
  { key: 'pdf',        label: '📄 PDF' },
  { key: 'principles', label: 'Principles' },
  { key: 'themes',     label: 'Monthly Themes' },
]

/* ─── Type Badge ─────────────────────────────────────────── */
const TYPE_ICONS: Record<ContentType, React.ReactNode> = {
  video: <Video size={14} />,
  audio: <Headphones size={14} />,
  pdf: <FileText size={14} />
}

function TypeBadge({ type }: { type: ContentType }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
      fontSize: '0.75rem', padding: '3px 8px', borderRadius: '999px',
      background: 'var(--surface-muted)', color: 'var(--text-muted)', fontWeight: 500,
    }}>
      {TYPE_ICONS[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

/* ─── Course Card ────────────────────────────────────────── */
function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div variants={itemVariants} className="course-card" role="article" aria-label={course.title} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      {/* Thumbnail */}
      <div className="course-card__thumb" style={{ background: course.gradient }}>
        {/* Subtle dot pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(124,158,138,0.07) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }} />
        <div className="course-card__thumb-icon">
          <Play fill="currentColor" size={20} />
        </div>
        {/* Module count badge */}
        <div style={{
          position: 'absolute', bottom: 8, left: 10,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.85)', fontSize: '0.6875rem', fontWeight: 600,
          padding: '2px 8px', borderRadius: '5px', letterSpacing: '0.02em',
        }}>
          {course.modules} {course.modules === 1 ? 'module' : 'modules'}
        </div>
        <div style={{
          position: 'absolute', bottom: 8, right: 10,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.85)', fontSize: '0.6875rem', fontWeight: 600,
          padding: '2px 8px', borderRadius: '5px',
        }}>
          {course.duration}
        </div>
      </div>

      {/* Content */}
      <div className="course-card__content">
        <p className="course-card__category">{course.category}</p>
        <p className="course-card__title">{course.title}</p>
        <p className="course-card__desc">{course.description}</p>
        <div className="course-card__meta">
          {course.types.map(t => <TypeBadge key={t} type={t} />)}
        </div>
        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="course-card__progress" title={`${course.progress}% complete`}>
            <div className="course-card__progress-fill" style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')

  const filtered = COURSES.filter(c => {
    const matchesFilter = activeFilter === 'all' || c.filterTags.includes(activeFilter)
    const matchesSearch = search.trim() === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '1rem' }}>

      {/* Header */}
      <motion.header variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>Library</h1>
        <p style={{ fontSize: '0.9375rem' }}>
          {COURSES.length} courses & series · Always growing
        </p>
      </motion.header>

      {/* Search */}
      <motion.div variants={itemVariants} style={{
        display: 'flex', alignItems: 'center', gap: '0.625rem',
        background: 'var(--surface-card)', border: '1.5px solid var(--surface-border)',
        borderRadius: 'var(--radius-md)', padding: '0.625rem 0.875rem',
        marginBottom: '1rem', boxShadow: 'var(--shadow-sm)',
      }}>
        <span style={{ color: 'var(--text-muted)', display: 'flex' }}>
          <Search size={18} strokeWidth={2.5} />
        </span>
        <input
          type="search"
          placeholder="Search courses, principles, themes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: '0.9375rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)',
          }}
          aria-label="Search library"
        />
      </motion.div>

      {/* Filter chips */}
      <motion.div variants={itemVariants} className="filter-chips" role="group" aria-label="Filter by content type">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`chip${activeFilter === f.key ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
            aria-pressed={activeFilter === f.key}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Results count */}
      {(search || activeFilter !== 'all') && (
        <motion.p variants={itemVariants} style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </motion.p>
      )}

      {/* Course grid */}
      {filtered.length > 0 ? (
        <motion.div variants={containerVariants} className="course-grid">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} style={{ textAlign: 'center', padding: '3rem 0' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</p>
          <p style={{ color: 'var(--text-muted)' }}>No results for &quot;{search}&quot;</p>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.75rem' }} onClick={() => { setSearch(''); setActiveFilter('all') }}>
            Clear search
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
