import { Typography, Grid } from "@mui/material";
import TasksList from "./components/TasksList";
import style from "./home.module.scss";

export default function Home() {
  return (
    <Grid container className={style.daily_tasks_home}>
      <TasksList />
      <Grid item lg={8}>
        <Typography variant="h3" component="label">
          Task Details
        </Typography>
      </Grid>
    </Grid>
  );
}
