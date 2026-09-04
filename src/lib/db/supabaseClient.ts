import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== "YOUR_SUPABASE_URL_HERE" &&
  supabaseKey !== "YOUR_SUPABASE_ANON_KEY_HERE"
);

// Create Supabase client if configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false, // NextAuth handles application session management
      },
    })
  : null;
