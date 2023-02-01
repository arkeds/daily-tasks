import { Grid, Paper, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./taskslist.module.scss";
import { useDialogueContext } from "@/components/pages/home/context/DialogContext";
const TasksList = () => {
  const { openDialogue } = useDialogueContext();
  const open = () => {
    //@ Todo
    // Toggle Dialogue
  };
  return (
    <Grid item lg={4} className={styles.taskslist}>
      <div className={styles.actionContainer}>
        <IconButton color="primary" onClick={() => openDialogue()}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <Typography variant="h3" component="label" fontWeight={700}>
        Daily Tasks
      </Typography>

      <div className={styles.taskslistsItems}></div>
    </Grid>
  );
};

export default TasksList;
