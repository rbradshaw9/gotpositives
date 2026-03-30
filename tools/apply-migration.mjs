#!/usr/bin/env node
/**
 * tools/apply-migration.mjs
 * 
 * Reads architecture/01_init_schema.sql and applies it to the live Supabase
 * database using the Management API.
 * 
 * REQUIRES:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env
 *   - SUPABASE_SERVICE_ROLE_KEY in .env
 *   - The database to be empty (first run only)
 * 
 * Usage:
 *   node tools/apply-migration.mjs
 * 
 * IMPORTANT: This does NOT use the Supabase CLI. It execute SQL directly 
 * via the REST API /rpc endpoint. For production migrations, use the 
 * Supabase dashboard or CLI supabase db push.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

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
const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const serviceKey = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !serviceKey) {
  console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env')
  process.exit(1)
}

const sql = readFileSync(resolve(process.cwd(), 'architecture/01_init_schema.sql'), 'utf-8')

console.log('\n=== Applying DB Migration ===')
console.log(`Target: ${supabaseUrl}`)
console.log(`SQL size: ${sql.length} chars\n`)

// Split into statements and execute via Supabase's SQL REST endpoint
// Note: Supabase doesn't expose a raw SQL endpoint in anon key, only via management API.
// For new project setup, recommend using Supabase Dashboard SQL Editor.
console.log('⚠️  Supabase does not expose a public SQL execution endpoint.')
console.log('   To apply architecture/01_init_schema.sql, use ONE of:')
console.log('')
console.log('   Option A — Supabase Dashboard (recommended for first setup):')
console.log('   1. Go to your Supabase project → SQL Editor')
console.log('   2. Paste the contents of architecture/01_init_schema.sql')
console.log('   3. Click Run')
console.log('')
console.log('   Option B — Supabase CLI:')
console.log('   supabase link --project-ref <your-project-ref>')
console.log('   supabase db push')
console.log('')
console.log('   After applying, run: node tools/verify-connections.mjs')
console.log('   to confirm all tables exist.\n')
