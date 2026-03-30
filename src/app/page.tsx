'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Headphones, Video, Users, PlaySquare, Ticket, ChevronRight, Play, CheckCircle2, Star } from 'lucide-react'
import { useRef } from 'react'

/* ─── Marketing Nav ─────────────────────────────────────── */
function MarketingNav() {
  return (
    <nav className="marketing-nav" style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(10,10,10,0.7)' }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem',
        letterSpacing: '-0.02em', color: '#fff', textDecoration: 'none', fontStyle: 'italic',
      }}>
        Positives<span style={{ fontSize: '0.625rem', verticalAlign: 'super', fontStyle: 'normal' }}>™</span>
      </Link>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <Link href="/login" className="btn btn-sm" style={{ color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none' }}>Sign in</Link>
        <Link href="/subscribe" className="btn btn-primary btn-sm" style={{ paddingInline: '1rem' }}>Join the Practice</Link>
      </div>
    </nav>
  )
}

/* ─── Timeline Item ─────────────────────────────────────── */
function TimelineItem({ cadence, title, desc, icon: Icon, delay = 0, isLast = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}
    >
      {/* ── Line & Node ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '3rem', flexShrink: 0 }}>
        <div style={{ 
          width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(46,196,182,0.1)', 
          border: '1px solid rgba(46,196,182,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--brand-teal)', zIndex: 2
        }}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {!isLast && (
          <div style={{ flex: 1, width: '2px', background: 'linear-gradient(to bottom, rgba(46,196,182,0.3), rgba(46,196,182,0.05))', marginBlock: '0.5rem' }} />
        )}
      </div>

      {/* ── Content ── */}
      <div style={{ paddingBottom: isLast ? 0 : '4rem', paddingTop: '0.25rem' }}>
        <p style={{
          fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 800,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-teal)', marginBottom: '0.5rem',
        }}>
          {cadence}
        </p>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{title}</h3>
        <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '440px' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <MarketingNav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="marketing-hero" style={{ paddingTop: '8rem', paddingBottom: '7rem', position: 'relative' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-teal)',
              border: '1px solid rgba(46,196,182,0.3)', background: 'rgba(46,196,182,0.05)',
              borderRadius: '999px', padding: '0.4rem 1.25rem', marginBottom: '1.75rem',
            }}>
              <Star size={14} fill="currentColor" /> Created by Dr. Paul & Expert Practitioners
            </p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.75rem, 7vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: '1.5rem' }}
          >
            Master your mind in <br />
            <span style={{ color: 'var(--brand-teal)', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>7 minutes a day.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '580px', marginInline: 'auto' }}
          >
            Stop letting anxiety and distraction hijack your potential. Put your personal growth on autopilot with a proven daily system that rewires how you think, act, and lead.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/subscribe" className="btn btn-primary btn-lg" style={{ paddingInline: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Claim Your Spot <ChevronRight size={18} strokeWidth={3} />
            </Link>
            <Link href="#framework" className="btn btn-outline btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={18} fill="currentColor" /> See the blueprint
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}
          >
            {[
              { text: 'Cancel anytime' },
              { text: 'Under $2/day' },
              { text: 'Instant access' }
            ].map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="var(--status-success)" /> {item.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE SYSTEM / STORY ────────────────────────────────── */}
      <section id="framework" style={{ padding: '7rem 1.5rem', background: 'var(--surface-muted)', position: 'relative' }}>
        
        {/* Story Intro */}
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--status-error)', marginBottom: '1rem' }}>
              The real problem
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Your ambition isn&apos;t the issue. <br/> Your system is.
            </h2>
            <p style={{ fontSize: '1.1875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              You read the books. You listen to the podcasts. But without a daily practice, that motivation fades. Dr. Paul and our Positivity Practitioners built this system because <strong>growth shouldn&apos;t feel like a chaotic puzzle.</strong> It should be an automated rhythm.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <TimelineItem 
            cadence="Daily" title="Audio Grounding" 
            desc="Start every morning with short, powerful audio messages from Dr. Paul and other Positivity Practitioners to anchor your focus before the day derails you."
            icon={Headphones} delay={0}
          />
          <TimelineItem 
            cadence="Weekly" title="The Inner Circle" 
            desc="Deepen your practice with a weekly video teaching from Dr. Paul, followed by an interactive, live Zoom meeting with him and other practitioners."
            icon={Users} delay={0.1}
          />
          <TimelineItem 
            cadence="Monthly" title="Masterclass Training" 
            desc="A high-leverage video training session from Dr. Paul added directly to the site. Break limiting beliefs and expand your vision."
            icon={PlaySquare} delay={0.2}
          />
          <TimelineItem 
            cadence="Annually" title="The Live Event" 
            desc="Step out of the digital world and completely reset at our exclusive, transformative annual event."
            icon={Ticket} delay={0.3} isLast={true}
          />
        </div>

      </section>

      {/* ── SOCIAL PROOF ────────────────────────────── */}
      <section style={{ padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-teal)', marginBottom: '1rem' }}>
            Proven Results
          </p>
          <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3rem)', letterSpacing: '-0.02em' }}>The secret weapon for top performers.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1080px', margin: '0 auto' }}>
          {[
            { quote: "I've tried every self-help app out there. Positives is the first one I've used every single day for six months. The daily audio from Dr. Paul feels like an unfair advantage.", name: "Sarah M.", role: "Founder & CEO" },
            { quote: "The 7-minute morning grounding has become non-negotiable. My family notices the difference on the days I skip it. My anxiety is down, and my output is through the roof.", name: "David K.", role: "Sales Director" },
            { quote: "The weekly Zoom calls with the practitioners changed my life. It's not a course you rush through; it's a practice you return to. That difference has changed everything.", name: "Priya R.", role: "Creative Agency Owner" },
          ].map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', cursor: 'default' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="var(--brand-teal)" color="var(--brand-teal)" />)}
              </div>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', flex: 1 }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{testimonial.name}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING CTA ─────────────────────────────── */}
      <section style={{ padding: '8rem 1.5rem', textAlign: 'center', background: 'var(--brand-ink)', color: 'var(--text-inverse)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(46,196,182,0.15) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '1.25rem', color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Stop putting your potential on hold.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ marginBottom: '3rem', fontSize: '1.1875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}
          >
            The longer you wait, the longer you stay exactly where you are. Join Dr. Paul and hundreds of driven individuals mastering their lives today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '3rem 2rem', borderRadius: '24px', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}
          >
            <h3 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
              $49 <span style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>/ month</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '1rem' }}>Less than the cost of your daily coffee.</p>
            
            <Link href="/subscribe" className="btn btn-primary btn-lg btn-full" style={{ paddingInline: '2.5rem', marginBottom: '1.5rem', height: '4rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Claim Your Spot <ChevronRight strokeWidth={3} size={20} />
            </Link>
            
            <p style={{ fontSize: '0.9375rem', color: 'var(--brand-teal)', fontWeight: 600 }}>
              Save $89 <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>with an</span> Annual Plan
            </p>
          </motion.div>

          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span>100% Risk-Free</span> • <span>Cancel Anytime</span> • <span>No Hidden Fees</span>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{ padding: '4rem 1.5rem', textAlign: 'center', background: 'var(--brand-charcoal)', color: 'rgba(255,255,255,0.5)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', fontStyle: 'italic', color: '#fff' }}>
          Positives<span style={{ fontSize: '0.625rem', verticalAlign: 'super', fontStyle: 'normal' }}>™</span>
        </p>
        <p style={{ fontSize: '0.9375rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          Empower your mind. Elevate your life.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { label: 'Subscribe', href: '/subscribe' },
            { label: 'Login', href: '/login' },
            { label: 'Member App', href: '/members?demo=subscribed' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} Live On Purpose Central. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
