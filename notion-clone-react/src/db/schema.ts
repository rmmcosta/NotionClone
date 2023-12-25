import {
  pgTable,
  serial,
  text,
  time,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 512 }).notNull(),
    imageUrl: text("imageUrl"),
    createdAt: time("createdAt").defaultNow(),
    userId: varchar("userId", { length: 256 }).notNull(),
    editorState: text("editorState"),
  },
  (notes) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(notes.name),
    };
  }
);

export type NoteType = typeof notes.$inferInsert;
