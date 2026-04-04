import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient(url: string, key: string): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(url, key)
  }
  return supabaseClient
}

export function initSupabase(url: string, key: string): SupabaseClient {
  supabaseClient = createClient(url, key)
  return supabaseClient
}

// Lazy init for backwards compatibility
export function supabase(): SupabaseClient {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Call initSupabase() in your app setup.')
  }
  return supabaseClient
}
