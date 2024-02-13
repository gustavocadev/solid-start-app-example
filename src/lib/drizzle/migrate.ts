import 'dotenv/config';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, sqlite } from './db';

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle' });

// Don't forget to close the connection, otherwise the script will hang
sqlite.close();
