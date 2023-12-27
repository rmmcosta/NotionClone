import { ArrowLeft } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import CreateNoteDialog from "../components/CreateNoteDialog";
import { NoteType } from "../db/schema";
import { getNotes } from "../services/noteService";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function DashboardPage() {
  const { userId } = useAuth();
  const [notes, setNotes] = useState<Array<NoteType>>([]);

  const fetchNotes = useCallback(async () => {
    const fetchedNotes = await getNotes(userId?.toString() || "");
    setNotes(fetchedNotes);
  }, [userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button
                  size="small"
                  sx={{
                    color: "green",
                    fontWeight: "bold",
                    "&:hover": {
                      color: "green",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
              <div className="w-4"></div>
            </div>
          </div>

          <div className="h-8"></div>
          <Divider light />
          <div className="h-8"></div>
          {/* list all the notes */}
          {/* if no notes, display this */}
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
            </div>
          )}

          {/* display all the notes */}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog onNoteCreated={fetchNotes} />
            {notes.map((note) => {
              const createdAt = note.createdAt || new Date(0);
              return (
                <a href={`/notebook/${note.id}`} key={note.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1 h-[400px]">
                    <img
                      width={400}
                      height={200}
                      alt={note.name}
                      src={note.imageUrl || ""}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500">
                        {createdAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
