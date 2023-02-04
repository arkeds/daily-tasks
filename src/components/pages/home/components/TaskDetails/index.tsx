import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./taskdetails.module.scss";
import { useTaskContext } from "../../context/TasksContext";
import TaskTimer from "./components/TaskTimer";
import { useEffect, useState } from "react";
const TaskDetails = () => {
  const { state, selectTask } = useTaskContext();

  const taskIds = Object.keys(state.tasks);
  const myTasks = Object.values(state.tasks);

  const selectedTask = state.selectedTask as string;

  // get selectedTask index
  const selectedTaskIndex = taskIds.indexOf(selectedTask);
  const [prevTask, setPrevTask] = useState<string>("");
  const [nextTask, setNextTask] = useState<string>("");

  useEffect(() => {
    let prevIndex = selectedTaskIndex - 1;
    let nextIndex = selectedTaskIndex + 1;

    if (prevIndex < 0) {
      prevIndex = 0;
    }

    if (nextIndex > taskIds.length - 1) {
      nextIndex = taskIds.length - 1;
    }

    setPrevTask(taskIds[prevIndex]);
    setNextTask(taskIds[nextIndex]);
  }, [selectedTaskIndex, taskIds]);

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
          <IconButton onClick={() => selectTask(prevTask)}>
            <ArrowBackIosIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </div>
        <div className={styles.task_view_details}>
          {myTasks.map((task) => {
            return <TaskTimer key={task.id} currentTask={task.id} />;
          })}
        </div>
        <div className={styles.task_view_control}>
          <IconButton onClick={() => selectTask(nextTask)}>
            <ArrowForwardIosIcon sx={{ fontSize: "3rem" }} />
          </IconButton>
        </div>
      </div>
    </Grid>
  );
};

export default TaskDetails;
