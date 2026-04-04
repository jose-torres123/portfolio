import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createSupabaseClient<TDatabase = unknown>(
  supabaseUrl: string,
  supabaseAnonKey: string
): SupabaseClient<TDatabase> {
  return createClient<TDatabase>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
