import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase no está configurado. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env'
  );
}

// Use fallback values to prevent server crash during initialization
// API calls will fail with clear errors if credentials are invalid
const fallbackUrl = supabaseUrl || 'https://placeholder.supabase.co';
const fallbackKey = supabaseKey || 'placeholder-key';

export const supabase = createClient(fallbackUrl, fallbackKey);
