import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vocufquyswuudjmlitfi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvY3VmcXV5c3d1dWRqbWxpdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNjk1NTAsImV4cCI6MjA4NDk0NTU1MH0.pTIFtUNyxCOtA99489XFRUto-RZbCNOVlH1UMIQrf9M';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
