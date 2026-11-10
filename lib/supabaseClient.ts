// ====================================================================
// SUPABASE CLIENT INITIALIZATION & RESILIENT FALLBACK LAYER
// Phase 1 Foundation
// ====================================================================

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-supabase')
  );
};

export const createClient = () => {
  if (isSupabaseConfigured()) {
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  }
  // Return stubbed client if env not configured yet to prevent initial crash
  return createSupabaseClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
};

// Singleton browser instance
export const supabase = createClient();
