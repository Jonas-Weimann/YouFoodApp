import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : [],
  JWT_SECRET: process.env.JWT_SECRET,
  SUPABASE_URL: process.env.SUPABASE_URL, 
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
};