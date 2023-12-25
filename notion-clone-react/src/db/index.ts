import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.REACT_APP_NOTIONCLONE_DB_URL!);

export const db = drizzle(sql);

//const result = await db.select().from(...);