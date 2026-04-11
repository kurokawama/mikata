/**
 * Service-role Supabase client for server-side operations.
 *
 * All DB write operations (article publish, subscription updates, etc.)
 * go through this module. The `server-only` import prevents this from
 * being bundled into client code.
 */
import 'server-only'

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Creates a Supabase admin client using the service_role key.
 * Only use in Server Actions, API Routes, and webhooks.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
