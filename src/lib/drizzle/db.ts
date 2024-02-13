import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import * as schema from './schema';

export const sqlite = new Database('db.sqlite');
export const db = drizzle(sqlite, { schema });

migrate(db, {
  migrationsFolder: './drizzle',
});
