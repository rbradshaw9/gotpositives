# Project Constitution (Positives Platform)

## 1. North Star
Build a practice-based membership platform called "Positives" where members access daily audio grounding, weekly principles, and monthly themes. The platform should feel like a gym for personal growth — members return repeatedly rather than completing a course.

## 2. Integrations
- **Supabase**: database, auth, file storage
- **Stripe**: subscriptions ($49/mo regularly $97, and $499/yr annual)
- **ActiveCampaign**: email automation, behavioral sequences
- **Mux**: video hosting and playback
- **Castos**: private podcast/audio RSS feed
- **Twilio**: SMS transactional messages
- **Vercel**: hosting and deployment

## 3. Source of Truth
Supabase is the single source of truth for all member data, subscription status, content access, and progress.

## 4. Delivery Payload
A Next.js web application deployed on Vercel. Mobile-first responsive design functioning as a PWA. Members access it via browser on desktop and mobile.

## 5. Behavioral Rules
- Members never feel "behind" — no linear curriculum, no completion states.
- Content is organized by rhythm (Today / This Week / This Month), not dates.
- The daily audio player is the #1 priority — it must work flawlessly on mobile including background playback.
- Never expose pricing without showing the regular price ($97) alongside the offered price ($49).
- No dark patterns. Billing portal is self-serve via Stripe — cancel anytime.
- Stripe webhooks are the source of truth for access — never trust client-side subscription status.
- All content access decisions happen server-side in Next.js middleware.

## 6. Stripe Webhooks
The system must actively listen to and handle the following Stripe webhooks to ensure the Source of Truth remains accurate:
- `customer.subscription.created`: Provision access, update `MEMBER` status.
- `customer.subscription.updated`: Update billing period, status (e.g. past_due, canceled), tier.
- `customer.subscription.deleted`: Revoke access instantly, update `MEMBER` status.
- `invoice.payment_failed`: Log failure, notify user, potentially update status to `past_due`.

## 7. Data Schema

### 7.1 Core Entities

#### MEMBER (Profiles)
- `id` (uuid, PK, references `auth.users` ON DELETE CASCADE)
- `email` (string, unique)
- `name` (string)
- `avatar_url` (string, nullable)
- `created_at` (timestamp, default now())
- `stripe_customer_id` (string, unique, nullable)
- `subscription_status` (string: 'active', 'canceled', 'past_due', 'trialing', etc.)
- `subscription_tier` (string: 'monthly', 'annual', 'coaching')
- `subscription_end_date` (timestamp, nullable)
- `practice_streak` (integer, default 0)
- `last_practiced_at` (timestamp, nullable)

#### CONTENT
- `id` (uuid, PK)
- `title` (string)
- `type` (string: 'daily_audio', 'weekly_principle', 'monthly_theme', 'library', 'workshop')
- `description` (text, nullable)
- `duration_seconds` (integer, nullable)
- `mux_asset_id` (string, nullable)
- `castos_episode_url` (string, nullable)
- `published_at` (timestamp)
- `month_theme` (string, nullable)
- `tags` (array of strings, nullable)
- `is_active` (boolean, default true)

#### PROGRESS
- `id` (uuid, PK)
- `member_id` (uuid, FK to `MEMBER`)
- `content_id` (uuid, FK to `CONTENT`)
- `listened_at` (timestamp)
- `completed` (boolean, default false)
- `reflection_text` (text, nullable)

#### JOURNAL
- `id` (uuid, PK)
- `member_id` (uuid, FK to `MEMBER`)
- `content_id` (uuid, FK to `CONTENT`, nullable)
- `entry_text` (text)
- `created_at` (timestamp, default now())

#### COMMUNITY_POST
- `id` (uuid, PK)
- `member_id` (uuid, FK to `MEMBER`)
- `content_id` (uuid, FK to `CONTENT`, where type='weekly_principle')
- `body` (text)
- `post_type` (string: 'reflection', 'checkin', 'question')
- `created_at` (timestamp, default now())

### 7.2 Relationships & Foreign Keys
- `PROGRESS.member_id` references `MEMBER.id` (ON DELETE CASCADE)
- `PROGRESS.content_id` references `CONTENT.id` (ON DELETE CASCADE)
- `JOURNAL.member_id` references `MEMBER.id` (ON DELETE CASCADE)
- `JOURNAL.content_id` references `CONTENT.id` (ON DELETE SET NULL)
- `COMMUNITY_POST.member_id` references `MEMBER.id` (ON DELETE CASCADE)
- `COMMUNITY_POST.content_id` references `CONTENT.id` (ON DELETE CASCADE)

### 7.3 Indexes
- `MEMBER`: `idx_member_stripe_customer_id` (`stripe_customer_id`)
- `CONTENT`: `idx_content_published_at` (`published_at`), `idx_content_type` (`type`)
- `PROGRESS`: `idx_progress_member_id` (`member_id`), `idx_progress_content_id` (`content_id`)
- `JOURNAL`: `idx_journal_member_id` (`member_id`), `idx_journal_created_at` (`created_at`)
- `COMMUNITY_POST`: `idx_community_post_content_id` (`content_id`), `idx_community_post_created_at` (`created_at`)

### 7.4 Row Level Security (RLS) Policies
- **MEMBER**: 
  - `SELECT`: Members can ONLY read their own profile (`id = auth.uid()`).
  - `UPDATE`: Members can ONLY update their own profile (`id = auth.uid()`).
- **CONTENT**:
  - `SELECT`: Authenticated active members can read active content.
- **PROGRESS**:
  - `SELECT`, `INSERT`, `UPDATE`, `DELETE`: Members can ONLY read and manage their own progress data (`member_id = auth.uid()`).
- **JOURNAL**:
  - `SELECT`, `INSERT`, `UPDATE`, `DELETE`: Members can ONLY read and manage their own private journal entries (`member_id = auth.uid()`).
- **COMMUNITY_POST**:
  - `SELECT`: All active members can read community posts.
  - `INSERT`, `UPDATE`, `DELETE`: Members can manage their own posts (`member_id = auth.uid()`).
