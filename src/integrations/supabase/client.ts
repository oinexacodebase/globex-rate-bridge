// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hfinwgrecyqvprutcvqk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaW53Z3JlY3lxdnBydXRjdnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MTEyMzgsImV4cCI6MjA1MzQ4NzIzOH0.0r3hRw6rC7wOAkD2-YKjw6EqMuHOPlOLcHPoxpY3zbs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);