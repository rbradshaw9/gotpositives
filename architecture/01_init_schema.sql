-- architecture/01_init_schema.sql
-- This contains the Supabase Postgres schema definition.
-- Apply this file to the live database when it's provisioned.

create extension if not exists "uuid-ossp";

-- 1. MEMBER table
create table public.member (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    name text,
    avatar_url text,
    created_at timestamp with time zone default now(),
    stripe_customer_id text unique,
    subscription_status text,
    subscription_tier text,
    subscription_end_date timestamp with time zone,
    practice_streak integer default 0,
    last_practiced_at timestamp with time zone,
    -- Rewardful affiliate fields (nullable, mirrored for UI display)
    rewardful_affiliate_id text,
    rewardful_referral_link text,
    affiliate_status text, -- 'active', 'pending', 'not_joined'
    affiliate_joined_at timestamp with time zone,
    recruiter_affiliate_id text -- optional reference to the member's own recruiter
);
alter table public.member enable row level security;

-- 2. CONTENT table
create table public.content (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    type text not null, -- 'daily_audio', 'weekly_principle', 'monthly_theme', 'library', 'workshop'
    description text,
    duration_seconds integer,
    mux_asset_id text,
    castos_episode_url text,
    published_at timestamp with time zone not null,
    month_theme text,
    tags text[],
    is_active boolean default true
);
alter table public.content enable row level security;

-- 3. PROGRESS table
create table public.progress (
    id uuid primary key default uuid_generate_v4(),
    member_id uuid references public.member(id) on delete cascade not null,
    content_id uuid references public.content(id) on delete cascade not null,
    listened_at timestamp with time zone default now(),
    completed boolean default false,
    reflection_text text
);
alter table public.progress enable row level security;

-- 4. JOURNAL table
create table public.journal (
    id uuid primary key default uuid_generate_v4(),
    member_id uuid references public.member(id) on delete cascade not null,
    content_id uuid references public.content(id) on delete set null,
    entry_text text not null,
    created_at timestamp with time zone default now()
);
alter table public.journal enable row level security;

-- 5. COMMUNITY_POST table
create table public.community_post (
    id uuid primary key default uuid_generate_v4(),
    member_id uuid references public.member(id) on delete cascade not null,
    content_id uuid references public.content(id) on delete cascade not null,
    body text not null,
    post_type text not null, -- 'reflection', 'checkin', 'question'
    created_at timestamp with time zone default now()
);
alter table public.community_post enable row level security;


-- INDEXES
create index idx_member_stripe_customer_id on public.member(stripe_customer_id);
create index idx_content_published_at on public.content(published_at);
create index idx_content_type on public.content(type);
create index idx_progress_member_id on public.progress(member_id);
create index idx_progress_content_id on public.progress(content_id);
create index idx_journal_member_id on public.journal(member_id);
create index idx_journal_created_at on public.journal(created_at);
create index idx_community_post_content_id on public.community_post(content_id);
create index idx_community_post_created_at on public.community_post(created_at);

-- 6. AFFILIATE_STATS_CACHE table (optional UI cache, Rewardful is source of truth)
create table public.affiliate_stats_cache (
    affiliate_id text primary key, -- matches rewardful_affiliate_id on member
    clicks integer default 0,
    leads integer default 0,
    conversions integer default 0,
    commissions_earned numeric(10, 2) default 0,
    commissions_paid numeric(10, 2) default 0,
    recruiter_override_earned numeric(10, 2) default 0,
    last_synced_at timestamp with time zone default now()
);
alter table public.affiliate_stats_cache enable row level security;
create policy "Members read own affiliate stats" on public.affiliate_stats_cache
  for select using (
    affiliate_id in (
      select rewardful_affiliate_id from public.member where id = auth.uid()
    )
  );

-- 7. WEBHOOK_EVENT_LOG table (audit log for all webhook events)
create table public.webhook_event_log (
    id uuid primary key default uuid_generate_v4(),
    provider text not null, -- 'stripe', 'rewardful', 'mux'
    event_type text not null,
    payload jsonb,
    received_at timestamp with time zone default now()
);
alter table public.webhook_event_log enable row level security;
-- webhook_event_log is admin-only; no member-facing RLS policy needed


-- ADDITIONAL INDEXES
create index idx_member_rewardful_affiliate_id on public.member(rewardful_affiliate_id);
create index idx_webhook_event_log_provider on public.webhook_event_log(provider);
create index idx_webhook_event_log_received_at on public.webhook_event_log(received_at);


-- ROW LEVEL SECURITY (RLS) POLICIES

-- member
create policy "Members can read own profile" on public.member for select using ( auth.uid() = id );
create policy "Members can update own profile" on public.member for update using ( auth.uid() = id );

-- content
-- (Assuming full validation of active subscription is done elsewhere or requires a complex join,
-- but a simplistic implementation for 'authenticated' users is provided here representing schema intention)
create policy "Authenticated members can read active content" on public.content for select using (
  auth.role() = 'authenticated' and is_active = true
);

-- progress
create policy "Members read own progress" on public.progress for select using ( auth.uid() = member_id );
create policy "Members insert own progress" on public.progress for insert with check ( auth.uid() = member_id );
create policy "Members update own progress" on public.progress for update using ( auth.uid() = member_id );
create policy "Members delete own progress" on public.progress for delete using ( auth.uid() = member_id );

-- journal
create policy "Members read own journal" on public.journal for select using ( auth.uid() = member_id );
create policy "Members insert own journal" on public.journal for insert with check ( auth.uid() = member_id );
create policy "Members update own journal" on public.journal for update using ( auth.uid() = member_id );
create policy "Members delete own journal" on public.journal for delete using ( auth.uid() = member_id );

-- community_post
create policy "All authenticated can read community posts" on public.community_post for select using ( auth.role() = 'authenticated' );
create policy "Members manage own post (insert)" on public.community_post for insert with check ( auth.uid() = member_id );
create policy "Members manage own post (update)" on public.community_post for update using ( auth.uid() = member_id );
create policy "Members manage own post (delete)" on public.community_post for delete using ( auth.uid() = member_id );
