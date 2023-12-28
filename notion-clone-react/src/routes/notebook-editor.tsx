"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { NoteType } from "../db/schema";
import { useCompletion } from "ai/react";
import Button from "@mui/material/Button";
import NotebookEditorMenuBar from "./notebook-editor-menu-bar";
import { useDebounce } from "../components/useDebounce";
import { saveNote } from "../services/noteService";

type Props = { note: NoteType };

const NotebookEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const [isLoading, setIsLoading] = React.useState(false);

  const { complete, completion } = useCompletion({
    api: process.env.REACT_APP_BACKEND_COMPLETION_API,
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // take the last 30 words
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    console.log("completion: ",completion);
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    // save to db
    setIsLoading(true);
    if (debouncedEditorState === "") return;
    note.editorState = debouncedEditorState;
    saveNote(note);
    setIsLoading(false);
  }, [debouncedEditorState, note]);
  return (
    <>
      <div className="flex">
        {editor && <NotebookEditorMenuBar editor={editor} />}
        <Button disabled variant="outlined">
          {isLoading ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="prose prose-sm w-full mt-4">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </>
  );
};

export default NotebookEditor;
