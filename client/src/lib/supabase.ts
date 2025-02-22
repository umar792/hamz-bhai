
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odnnwiimnqrwcswijaxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbm53aWltbnFyd2Nzd2lqYXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzAyMTYsImV4cCI6MjA1NTgwNjIxNn0.ZRJWG7vaEO_kawD8-Xd3SM83PywGgvuWfsRSt6O2XAM';

export const supabase = createClient(supabaseUrl, supabaseKey);
