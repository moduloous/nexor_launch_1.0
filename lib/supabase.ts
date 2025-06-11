import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://ajfonpzetlpmenxemofe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E0NjMwMzAxLTJjMWEtNDY3Zi04MGRkLTNlZWI5MDY2OTUzYSJ9.eyJ1cmwiOiJkcmVzc2VzL1ByaXlhaCBDb250cmFzdCBGb2xkIE92ZXIgRHJlc3Mud2VicCIsImlhdCI6MTc0NjkwMTUzMywiZXhwIjoxNzc4NDM3NTMzfQ.6TlxK7mewBjEl0BxaP1Bwkyn-pXCshV3ktv1PDATDMo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 