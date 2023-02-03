import { FC } from "react";
import { Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./taskitem.module.scss";
import { useTaskContext } from "@/components/pages/home/context/TasksContext";

interface IProp {
  id: string;
  taskDescription: string;
  taskDuration: number;
  taskTheme: string;
}

const TaskItem: FC<IProp> = ({
  id,
  taskDescription,
  taskDuration,
  taskTheme,
}) => {
  const { state: taskState, selectTask } = useTaskContext();

  const elevation = taskState.selectedTask === id ? 24 : 0;
  return (
    <Paper
      className={styles.task_item_container}
      elevation={elevation}
      sx={{
        backgroundColor: taskTheme,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "1rem",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => selectTask(id)}
    >
      <Typography variant="h6" component="label" fontWeight={700}>
        {taskDescription}
      </Typography>
      <div className={styles.task_item_actions}>
        <div className={styles.task_item_duration}>
          <Typography variant="h6" component="label" fontWeight={700}>
            {taskDuration}
          </Typography>

          <AccessTimeIcon />
        </div>
        <div className={styles.task_item_select}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </Paper>
  );
};

export default TaskItem;
