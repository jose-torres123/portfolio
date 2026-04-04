import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export const supabase = getSupabaseClient()
