/**
 * Lightweight Supabase client wrapper.
 *
 * The Elitesphere marketing site is a static SPA deployed on GitHub Pages, so
 * the contact form needs an external persistence layer. We use Supabase (free
 * tier, no server required) and gracefully fall back to local-only behaviour
 * when credentials aren't configured.
 *
 * Configure at build time via `.env`:
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=ey...
 *
 * The Supabase client (~200 KB) is only loaded on demand so the main bundle
 * stays small when the integration is disabled.
 */

import type { SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
);

let clientPromise: Promise<SupabaseClient | null> | null = null;

async function loadClient(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  if (!clientPromise) {
    clientPromise = (async () => {
      const { createClient } = await import('@supabase/supabase-js');
      return createClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
        auth: { persistSession: false },
      });
    })();
  }
  return clientPromise;
}

/**
 * Insert a contact-form inquiry into the `inquiries` table.
 * Returns true on success, false if Supabase isn't configured or the call
 * failed. The form UX never depends on the outcome — this is fire-and-forget.
 */
export async function submitInquiryRemote(row: {
  full_name: string;
  company_name: string;
  email_address: string;
  phone_number: string;
  service_interested_in: string;
  message: string;
}): Promise<boolean> {
  try {
    const sb = await loadClient();
    if (!sb) return false;
    const { error } = await sb.from('inquiries').insert([row]);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Insert a newsletter subscription into the `newsletter_subscribers` table.
 */
export async function subscribeNewsletterRemote(email: string): Promise<boolean> {
  try {
    const sb = await loadClient();
    if (!sb) return false;
    const { error } = await sb
      .from('newsletter_subscribers')
      .insert([{ email_address: email }]);
    return !error;
  } catch {
    return false;
  }
}