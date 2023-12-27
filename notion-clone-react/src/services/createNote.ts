import { db } from "../db/index";
import { NoteType, notes } from "../db/schema";

export const insertNote = async (note: NoteType) => {
  try {
    return db.insert(notes).values(note);
  } catch (error) {
    console.error(error);
  }
};
