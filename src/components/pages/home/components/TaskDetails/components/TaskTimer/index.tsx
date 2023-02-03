import {
  ITask,
  useTaskContext,
} from "@/components/pages/home/context/TasksContext";
import { IconButton, Paper, Typography } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import styles from "./tasktimer.module.scss";
import useStopwatch from "./hooks/useStopwatch";
import { FC, useEffect } from "react";

interface IProps {
  currentTask: string;
}
const TaskTimer: FC<IProps> = ({ currentTask }) => {
  const { state } = useTaskContext();

  const taskToView: ITask = state!.tasks[currentTask];

  const duration = taskToView.duration * 60;

  const { seconds, pauseTimer, playTimer, reset } = useStopwatch(duration);

  useEffect(() => {
    reset();
  }, [currentTask]);
  return (
    <Paper
      className={styles.task_timer_container}
      elevation={3}
      sx={{ backgroundColor: taskToView!.theme ?? "#FFFFFF" }}
    >
      <div className={styles.taskTimerSummary}>
        <div className={styles.summaryElapsed}>
          <Typography variant="subtitle1" component="label" fontWeight={700}>
            Minutes Elapsed
          </Typography>
          <div className={styles.summaryDetails}>
            <HourglassBottomIcon />
            <Typography variant="body2" component="label" fontWeight={700}>
              {taskToView.duration - Math.floor(seconds / 60)}
            </Typography>
          </div>
        </div>
        <div className={styles.summaryRemaining}>
          <Typography variant="subtitle1" component="label" fontWeight={700}>
            Minutes Remaining
          </Typography>
          <div className={styles.summaryDetails}>
            <Typography variant="body2" component="label" fontWeight={700}>
              {taskToView.duration -
                (taskToView.duration - Math.floor(seconds / 60))}
            </Typography>
            <HourglassBottomIcon />
          </div>
        </div>
      </div>
      <div className={styles.taskTimerCountdown}>
        <Typography variant="h4" component="h4" fontWeight={600}>
          {taskToView!.description ?? "-"}
        </Typography>
        <div className={styles.timerDisplayContainer}>
          <div className={styles.timerDisplay}>
            <Typography variant="h2" component="label" fontWeight={700}>
              {Math.floor(seconds / 60)}
            </Typography>
            <Typography variant="h6" component="label" fontWeight={700}>
              Minutes
            </Typography>
          </div>
          <div className={styles.timerColonDisplay}>
            <Typography variant="h2" component="label" fontWeight={700}>
              :
            </Typography>
          </div>
          <div className={styles.timerDisplay}>
            <Typography variant="h2" component="label" fontWeight={700}>
              {Math.floor(seconds % 60)}
            </Typography>
            <Typography variant="h6" component="label" fontWeight={700}>
              Seconds
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.taskTimerControls}>
        <IconButton size="large" color="error" onClick={() => reset()}>
          <StopCircleIcon sx={{ fontSize: "2em" }} />
        </IconButton>
        <IconButton size="large" color="primary" onClick={() => playTimer()}>
          <PlayCircleOutlineIcon sx={{ fontSize: "4em" }} />
        </IconButton>
        <IconButton color="default" onClick={() => pauseTimer()}>
          <PauseCircleOutlineIcon sx={{ fontSize: "2em" }} />
        </IconButton>
      </div>
    </Paper>
  );
};

export default TaskTimer;
