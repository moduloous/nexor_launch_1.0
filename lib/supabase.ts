import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Supabase client
const supabaseUrl = 'https://ajfonpzetlpmenxemofe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    // Disable realtime to avoid WebSocket/Node.js module issues
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    // Disable realtime for React Native
    headers: { 'x-client-info': 'supabase-js-react-native' },
  },
}); 