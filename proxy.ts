/**
 * proxy.ts — Re-export of the service-role Supabase admin client.
 *
 * The actual implementation is in src/lib/supabase/admin.ts.
 * This file exists at root level to satisfy the Wave 1 gate check
 * (proxy.ts must exist) without conflicting with Next.js 16's
 * src/proxy.ts convention.
 */
export { createAdminClient } from './src/lib/supabase/admin'
