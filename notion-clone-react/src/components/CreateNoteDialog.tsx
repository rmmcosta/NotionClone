import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { generateImage, generateImagePrompt } from "../services/openai";
import { insertNote } from "../services/noteService";
import { useAuth } from "@clerk/clerk-react";
import { uploadFileToFirebase } from "../services/firebase";

interface FormDialogProps {
  onNoteCreated: () => void;
}

export default function FormDialog({ onNoteCreated }: FormDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [noteName, setNoteName] = React.useState("");
  const [loading, setLoading] = React.useState(false); // new loading state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { userId } = useAuth();

  const handleCreate = async () => {
    setLoading(true); // start loading
    //call the api to create a new note book
    const imageDescription: string =
      (await generateImagePrompt(noteName)) || "empty slate";
    const generatedImageUrl = await generateImage(imageDescription);
    console.log(imageDescription);
    console.log(generatedImageUrl);
    if (!generatedImageUrl) return;
    const storedImageUrl = await uploadFileToFirebase(
      generatedImageUrl,
      noteName
    );
    await insertNote({
      name: noteName,
      userId: userId?.toString() || "",
      imageUrl: storedImageUrl,
    });
    setNoteName("");
    setOpen(false);
    onNoteCreated();
    setLoading(false); // end loading
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          border: "1px dashed",
          color: "green",
          fontWeight: "bold",
          "&:hover": {
            border: "1px dashed",
            color: "green",
            fontWeight: "bold",
          },
        }}
      >
        New Note Book
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Note Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can create a new note book by entering the name of the note
            book.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Note Name"
            type="text"
            fullWidth
            variant="standard"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCreate}
            disabled={loading}
          >
            Create
            {loading && <CircularProgress size={24} />}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
