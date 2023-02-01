import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { FC, useContext } from "react";
import { useDialogueContext } from "../../context/DialogContext";

const TaskDialogue: FC = () => {
  const { state, closeDialogue } = useDialogueContext();
  return (
    <Dialog open={state.visible}>
      <DialogTitle>Configure Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="taskName"
          label="Task Description"
          type="text"
          fullWidth
          variant="outlined"
          size="small"
        />
        <TextField
          autoFocus
          margin="dense"
          id="taskDuration"
          label="Task Duration"
          type="number"
          fullWidth
          variant="outlined"
          size="small"
        />
        <TextField
          autoFocus
          margin="dense"
          id="taskTheme"
          label="Theme"
          type="color"
          fullWidth
          variant="outlined"
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => closeDialogue()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialogue;
