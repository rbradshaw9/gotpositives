'use client'

import { motion } from 'framer-motion'
import { Heart, MessageSquare } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
}

export default function CommunityPage() {
  const posts = [
    {
      id: 1, author: 'Sarah M.', initials: 'SM', time: '2h ago', type: 'Reflection',
      principle: 'You Don\'t Need to Earn Rest',
      body: 'I caught myself this week feeling guilty about taking a nap. This principle made me realize I was operating from a belief that rest has to be earned. It hasn\'t magically resolved — but naming it helped.',
      likes: 14,
    },
    {
      id: 2, author: 'David K.', initials: 'DK', time: '5h ago', type: 'Check-in',
      principle: 'You Don\'t Need to Earn Rest',
      body: 'Day 3 of the morning ground. Still. Not linear. But showing up.',
      likes: 8,
    },
    {
      id: 3, author: 'Priya R.', initials: 'PR', time: '1d ago', type: 'Question',
      principle: 'You Don\'t Need to Earn Rest',
      body: 'Has anyone been using this principle with their kids? Trying to think about how to model this without just saying "it\'s okay to rest." Looking for practical ideas.',
      likes: 22,
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ paddingBottom: '1rem' }}>
      <motion.header variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>Community</h1>
        <p style={{ fontSize: '0.9375rem' }}>This week&apos;s principle · 143 members active</p>
      </motion.header>

      {/* This week's thread */}
      <motion.div variants={itemVariants} style={{
        background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
        borderRadius: 16, padding: '1.25rem', marginBottom: '1.5rem',
      }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '0.25rem' }}>
          This Week&#39;s Thread
        </p>
        <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>You Don&apos;t Need to Earn Rest</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
          How did this principle show up for you this week?
        </p>
        <button
          className="btn btn-sm"
          style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          onClick={() => alert('Post composer — coming soon')}
        >
          Share a reflection
        </button>
      </motion.div>

      {/* Posts */}
      <motion.div variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {posts.map(post => (
          <motion.div variants={itemVariants} key={post.id} style={{
            background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
            borderRadius: 16, padding: '1.25rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'var(--surface-muted)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-teal)',
              }}>
                {post.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{post.author}</span>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 600, padding: '1px 6px',
                    borderRadius: 99, background: 'var(--surface-muted)', color: 'var(--text-muted)',
                  }}>{post.type}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{post.time}</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              {post.body}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className="btn btn-ghost btn-sm"
                style={{ paddingLeft: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', gap: '0.375rem', display: 'flex', alignItems: 'center' }}
                onClick={() => alert('Like — connect Supabase')}
              >
                <Heart size={16} /> {post.likes}
              </button>
              <button
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', gap: '0.375rem', display: 'flex', alignItems: 'center' }}
                onClick={() => alert('Reply — connect Supabase')}
              >
                <MessageSquare size={16} /> Reply
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
