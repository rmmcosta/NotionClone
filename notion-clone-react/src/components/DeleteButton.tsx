import React from "react";
import { Trash } from "lucide-react";
import Button from "@mui/material/Button";
import { deleteNote } from "../services/noteService";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    try {
      await deleteNote(noteId);
      // Redirect to dashboard after successful deletion
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={handleDelete}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;
