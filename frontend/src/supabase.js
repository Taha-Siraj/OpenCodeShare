import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bofsivyusicurcugifnw.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PJTGy1IV6xdrRZ1vnO0OOQ_vF_HjM_R';

export const supabase = createClient(supabaseUrl, supabaseKey);
