import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wodpovoejpqhqkowheuf.supabase.co'
const supabaseAnonKey = 'sb_publishable_lvUeA307L2LKDwOtT2YqRA_cqs5Nex2'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)