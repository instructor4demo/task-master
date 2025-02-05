import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../.env');

console.log('=== DB Debug Info ===');
console.log('1. DB Current working directory:', process.cwd());
console.log('2. DB Resolved .env path:', envPath);
console.log('3. DB .env file exists:', fs.existsSync(envPath));

// dotenvの設定
if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config({ path: envPath });
}
//console.log('4. DB dotenv config result:', result);
console.log('5. DB DATABASE_URL:', process.env.DATABASE_URL);
console.log('==================');

import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@db/schema";

console.log('Current DATABASE_URL:', process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
  ws: ws,
});
