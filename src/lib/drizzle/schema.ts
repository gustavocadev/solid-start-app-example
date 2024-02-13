import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const note = sqliteTable('note', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),

  title: text('title').notNull(),
});
export type SelectNote = typeof note.$inferSelect;
