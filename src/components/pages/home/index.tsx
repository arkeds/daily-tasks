import { Typography, Grid } from "@mui/material";
import TaskDetails from "./components/TaskDetails";
import TaskDialogue from "./components/TaskDialogue";
import TasksList from "./components/TasksList";
import { DialogueContextProvider } from "./context/DialogContext";
import { TaskContextProvider } from "./context/TasksContext";
import style from "./home.module.scss";

export default function Home() {
  return (
    <>
      <DialogueContextProvider>
        <TaskContextProvider>
          <Grid container className={style.daily_tasks_home}>
            <TasksList />
            <TaskDetails />
          </Grid>
          <TaskDialogue />
        </TaskContextProvider>
      </DialogueContextProvider>
    </>
  );
}
