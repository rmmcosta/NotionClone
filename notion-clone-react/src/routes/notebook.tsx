import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../db";
import { NoteType, notes } from "../db/schema";
import { eq, and } from "drizzle-orm";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import DeleteButton from "../components/DeleteButton";
import NotebookEditor from "./notebook-editor";

const NotebookPage = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { userId } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteType | null>(null);

  useEffect(() => {
    if (!userId || !noteId) {
      console.log("navigate to dashboard", userId, noteId);
      navigate("/dashboard");
    } else {
      db.select()
        .from(notes)
        .where(and(eq(notes.id, parseInt(noteId)), eq(notes.userId, userId)))
        .then((notesInDB) => {
          if (notesInDB.length !== 1) {
            navigate("/dashboard");
          } else {
            const note: NoteType = notesInDB[0];
            setNote(note);
          }
        });
    }
  }, [userId, noteId, navigate]);

  if (!note) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button className="bg-green-600" size="small">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id || 0} />
          </div>
        </div>

        <div className="h-4"></div>
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <NotebookEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;
