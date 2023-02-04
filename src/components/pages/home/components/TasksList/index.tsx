import { Grid, Paper, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./taskslist.module.scss";
import { useDialogueContext } from "@/components/pages/home/context/DialogContext";
import { ITask, useTaskContext } from "../../context/TasksContext";
import TaskItem from "./components/TaskItem";
import { FC } from "react";

const TasksList: FC = () => {
  const { openDialogue } = useDialogueContext();
  const { state: tasksState } = useTaskContext();

  const tasks = Object.values(tasksState.tasks);
  return (
    <Grid item lg={4} className={styles.taskslist}>
      <div className={styles.actionContainer}>
        <IconButton color="primary" onClick={() => openDialogue("CREATE")}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <Typography variant="h3" component="label" fontWeight={700}>
        Daily Tasks
      </Typography>

      <div className={styles.taskslistsItems}>
        {tasks.map((task: ITask) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              taskDescription={task.description}
              taskDuration={task.duration}
              taskTheme={task.theme}
            />
          );
        })}
      </div>
    </Grid>
  );
};

export default TasksList;
