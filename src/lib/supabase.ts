import { createClient } from '@supabase/supabase-js'

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!rawSupabaseUrl || !supabaseAnonKey) {
  throw new Error("Las variables de entorno de Supabase (URL y Anon Key) deben estar definidas.");
}

// Clean up Supabase URL in case /rest/v1 or trailing slashes were accidentally appended
const supabaseUrl = rawSupabaseUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')

export const supabase = createClient(supabaseUrl, supabaseAnonKey.trim())