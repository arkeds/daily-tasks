import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { useDialogueContext } from "../../context/DialogContext";
import { ITask, useTaskContext } from "../../context/TasksContext";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";

interface IFormTask {
  description: string;
  duration: number;
  theme: string;
}

const TaskDialogue: FC = () => {
  const { state, closeDialogue } = useDialogueContext();
  const { createTask } = useTaskContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IFormTask>();

  const onSubmit = (data: IFormTask) => {
    const key = v4();
    const task: ITask = {
      id: key,
      description: data.description,
      duration: data.duration,
      state: "UNSTARTED",
      theme: data.theme,
    };
    createTask(task);
    reset();
    closeDialogue();
  };

  return (
    <Dialog open={state.visible}>
      <DialogTitle>Configure Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("description", {
              required: "Description is required.",
            })}
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
            {...register("duration", {
              required: "Duration is required.",
            })}
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
            {...register("theme", {
              required: "Theme is required.",
            })}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            color="inherit"
            type="button"
            onClick={() => closeDialogue()}
            sx={{ margin: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ margin: "1rem" }}
            disabled={!isValid}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialogue;
