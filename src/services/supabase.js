import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://efephqphmmcqrfkeryxz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmZXBocXBobW1jcXJma2VyeXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDE2ODQsImV4cCI6MjAzNjQ3NzY4NH0.psZ8G1q9L5AWUWaR4cxAHttvjpc4j3mFSSqhDp3nsNs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
