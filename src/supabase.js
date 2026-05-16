import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qccckoelrbuznxowdyne.supabase.co'
const supabaseAnonKey = 'sb_publishable_ze_YyVhAGsFE_gLlJNMiqw_BT6nOfRt'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
