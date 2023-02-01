import { Typography, Grid } from "@mui/material";
import { useState } from "react";
import TaskDialogue from "./components/TaskDialogue";
import TasksList from "./components/TasksList";
import { DialogueContextProvider } from "./context/DialogContext";
import style from "./home.module.scss";

export default function Home() {
  return (
    <>
      <DialogueContextProvider>
        <Grid container className={style.daily_tasks_home}>
          <TasksList />
          <Grid item lg={8}>
            <Typography variant="h3" component="label">
              Task Details
            </Typography>
          </Grid>
        </Grid>
        <TaskDialogue />
      </DialogueContextProvider>
    </>
  );
}
