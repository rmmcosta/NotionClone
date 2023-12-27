import { db } from "../db/index";
import { NoteType, notes } from "../db/schema";
import { eq } from "drizzle-orm";

export const insertNote = async (note: NoteType) => {
  try {
    return db.insert(notes).values(note);
  } catch (error) {
    console.error(error);
  }
};

export const getNotes = async (userId: string) =>
  await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(notes.name);
