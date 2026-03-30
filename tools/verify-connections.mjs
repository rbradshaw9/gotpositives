#!/usr/bin/env node
/**
 * tools/verify-connections.mjs
 * 
 * Run this ONCE live credentials are in .env to verify:
 *   - Supabase connection (auth + db)
 *   - Stripe connection
 *   - Rewardful connection
 * 
 * Usage:
 *   node tools/verify-connections.mjs
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Parse .env manually (no dotenv dependency needed)
function loadEnv() {
  const env = {}
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [key, ...rest] = trimmed.split('=')
      env[key.trim()] = rest.join('=').trim()
    }
  } catch {}
  return env
}

const env = loadEnv()

const REQUIRED_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'REWARDFUL_API_KEY',
]

let allPassed = true

console.log('\n=== POSITIVES PLATFORM — CONNECTION VERIFICATION ===\n')

// 1. ENV VARS CHECK
console.log('1. Environment Variables:')
for (const varName of REQUIRED_VARS) {
  const val = env[varName]
  if (!val) {
    console.log(`   ✗ MISSING  ${varName}`)
    allPassed = false
  } else {
    // Show first 8 chars only
    console.log(`   ✓ SET      ${varName} (${val.substring(0, 8)}...)`)
  }
}

// 2. SUPABASE CONNECTION
console.log('\n2. Supabase Connection:')
const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']

if (supabaseUrl && supabaseKey) {
  try {
    const resp = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    })
    if (resp.ok || resp.status === 200 || resp.status === 404) {
      console.log(`   ✓ Supabase REST API reachable (${resp.status})`)
    } else {
      console.log(`   ✗ Supabase returned ${resp.status}`)
      allPassed = false
    }
  } catch (e) {
    console.log(`   ✗ Supabase unreachable: ${e.message}`)
    allPassed = false
  }
} else {
  console.log('   ✗ Skipped — missing Supabase env vars')
  allPassed = false
}

// 3. SUPABASE TABLES CHECK
console.log('\n3. Supabase Schema (required tables):')
const serviceKey = env['SUPABASE_SERVICE_ROLE_KEY']
const requiredTables = ['member', 'content', 'progress', 'journal', 'community_post', 'affiliate_stats_cache', 'webhook_event_log']
if (supabaseUrl && serviceKey) {
  for (const table of requiredTables) {
    try {
      const resp = await fetch(`${supabaseUrl}/rest/v1/${table}?limit=0`, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Prefer': 'count=exact'
        }
      })
      if (resp.ok) {
        console.log(`   ✓ Table exists: ${table}`)
      } else if (resp.status === 404) {
        console.log(`   ✗ Table MISSING: ${table} — run architecture/01_init_schema.sql`)
        allPassed = false
      } else {
        console.log(`   ✗ Table check failed: ${table} (${resp.status})`)
        allPassed = false
      }
    } catch (e) {
      console.log(`   ✗ Error checking ${table}: ${e.message}`)
      allPassed = false
    }
  }
} else {
  console.log('   ✗ Skipped — missing SUPABASE_SERVICE_ROLE_KEY')
  allPassed = false
}

// 4. STRIPE CONNECTION
console.log('\n4. Stripe Connection:')
const stripeKey = env['STRIPE_SECRET_KEY']
if (stripeKey) {
  try {
    const resp = await fetch('https://api.stripe.com/v1/account', {
      headers: { 'Authorization': `Bearer ${stripeKey}` }
    })
    if (resp.ok) {
      const data = await resp.json()
      console.log(`   ✓ Stripe connected (account: ${data.id}, ${data.display_name ?? data.business_profile?.name ?? 'unknown'})`)
    } else {
      const err = await resp.json()
      console.log(`   ✗ Stripe error: ${err.error?.message}`)
      allPassed = false
    }
  } catch (e) {
    console.log(`   ✗ Stripe unreachable: ${e.message}`)
    allPassed = false
  }
} else {
  console.log('   ✗ Skipped — missing STRIPE_SECRET_KEY')
  allPassed = false
}

// 5. REWARDFUL CONNECTION
console.log('\n5. Rewardful Connection:')
const rewardfulKey = env['REWARDFUL_API_KEY']
if (rewardfulKey) {
  try {
    const resp = await fetch('https://api.getrewardful.com/v1/campaigns', {
      headers: { 'Authorization': `Bearer ${rewardfulKey}` }
    })
    if (resp.ok) {
      const data = await resp.json()
      const count = Array.isArray(data) ? data.length : '?'
      console.log(`   ✓ Rewardful connected (${count} campaign(s) found)`)
    } else {
      const err = await resp.text()
      console.log(`   ✗ Rewardful error ${resp.status}: ${err}`)
      allPassed = false
    }
  } catch (e) {
    console.log(`   ✗ Rewardful unreachable: ${e.message}`)
    allPassed = false
  }
} else {
  console.log('   ✗ Skipped — missing REWARDFUL_API_KEY')
  allPassed = false
}

console.log('\n=====================================================')
console.log(allPassed ? '✓ ALL CHECKS PASSED' : '✗ SOME CHECKS FAILED — see above')
console.log('=====================================================\n')
process.exit(allPassed ? 0 : 1)
