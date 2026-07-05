import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sgdvvpejizoqjumhpduc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZHZ2cGVqaXpvcWp1bWhwZHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjQzMDQsImV4cCI6MjA5ODc0MDMwNH0.GQwEqIshPl9AbpVAYwc4kpWK2oCvKoBLB1JCPhkK6q0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);