import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          border: '1px dashed',
          '&:hover': {
            border: '1px dashed',
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
