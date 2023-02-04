import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useDialogueContext } from "../../context/DialogContext";
import { ITask, useTaskContext } from "../../context/TasksContext";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";

interface IFormTask {
  description: string;
  duration: number | string;
  theme: string;
}

const TaskDialogue: FC = () => {
  const { state, closeDialogue } = useDialogueContext();
  const { state: taskState, createTask, updateTask } = useTaskContext();
  const selectedTask = taskState.selectedTask as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<IFormTask>();

  useEffect(() => {
    if (state.mode === "EDIT") {
      const taskToEdit = taskState.tasks[selectedTask];
      reset({
        description: taskToEdit.description,
        duration: taskToEdit.duration,
        theme: taskToEdit.theme,
      });
    } else {
      reset({
        description: "",
        duration: "",
        theme: "#4d708f",
      });
    }
  }, [state.mode, taskState.selectedTask]);

  const onSubmit = (data: IFormTask) => {
    if (state.mode === "EDIT") {
      const duration = parseInt(data.duration as string);
      updateTask(selectedTask, {
        description: data.description,
        duration: duration,
        theme: data.theme,
        id: selectedTask,
        state: "STARTED",
      });
    } else {
      const key = v4();
      const duration = parseInt(data.duration as string);
      const task: ITask = {
        id: key,
        description: data.description,
        duration: duration,
        state: "UNSTARTED",
        theme: data.theme,
      };
      createTask(task);
    }

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
