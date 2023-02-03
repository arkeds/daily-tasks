import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./taskdetails.module.scss";
import { useTaskContext } from "../../context/TasksContext";
import TaskTimer from "./components/TaskTimer";
const TaskDetails = () => {
  const { state } = useTaskContext();

  const selectedTask = state.selectedTask;
  const myTasks = Object.values(state.tasks);
  return (
    <Grid item lg={8} className={styles.taskdetails}>
      <div className={styles.action_container}>
        <Button
          variant="text"
          color="primary"
          sx={{
            fontWeight: 700,
            fontSize: "1.25rem",
          }}
        >
          Edit
        </Button>
      </div>
      <div className={styles.task_view_control_container}>
        <div className={styles.task_view_control}>
          <IconButton>
            <ArrowBackIosIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </div>
        <div className={styles.task_view_details}>
          {myTasks.map((task) => {
            return <TaskTimer key={task.id} currentTask={task.id} />;
          })}
        </div>
        <div className={styles.task_view_control}>
          <IconButton>
            <ArrowForwardIosIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </div>
      </div>
    </Grid>
  );
};

export default TaskDetails;
