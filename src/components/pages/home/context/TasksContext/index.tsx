import { createContext, FC, ReactNode, useContext, useReducer } from "react";

interface IProps {
  children: ReactNode;
}

export interface ITask {
  id: string;
  description: string;
  duration: number;
  state: "UNSTARTED" | "STARTED" | "PAUSED" | "ENDED";
  theme: string;
}

interface ITaskAction {
  type: string;
  payload?: any;
}

interface ITaskContainer {
  [prop: string]: ITask;
}

interface ITaskState {
  tasks: ITaskContainer;
  selectedTask: string | null;
}

const initialState: ITaskState = {
  tasks: {},
  selectedTask: null,
};

interface ITaskContext {
  state: ITaskState;
  selectTask: (task: string) => void;
  createTask: (task: ITask) => void;
  startTimer: (taskId: string) => void;
  pauseTimer: (taskId: string) => void;
  stopTimer: (taskId: string) => void;
  updateTask: (taskId: string, taskData: ITask) => void;
  removeTask: (taskId: string) => void;
}

const TaskContext = createContext<ITaskContext | null>(null);

export const TaskContextProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: ITaskState, action: ITaskAction) => {
      const { type, payload } = action;
      switch (type) {
        case "CREATE_TASK":
          return {
            ...state,
            tasks: {
              ...state.tasks,
              [payload.id]: payload,
            },
            selectedTask: payload.id,
          };
        case "SELECT_TASK":
          return {
            ...state,
            selectedTask: payload,
          };
        case "UPDATE_TASK": {
          return {
            ...state,
            tasks: {
              ...state.tasks,
              [payload.taskId]: {
                ...state.tasks[payload.taskId],
                description: payload.description,
                duration: payload.duration,
                theme: payload.theme,
              },
            },
          };
        }
        case "REMOVE_TASK": {
          const tasks = state.tasks;
          delete tasks[payload];

          const newSelectedTask = Object.keys(tasks)[0];
          return {
            ...state,
            tasks: tasks,
            selectedTask: newSelectedTask,
          };
        }
        default:
          return state;
      }
    },
    initialState
  );

  const createTask = (task: ITask) => {
    dispatch({
      type: "CREATE_TASK",
      payload: task,
    });
  };

  const startTimer = (taskId: string) => {};

  const pauseTimer = () => {};

  const stopTimer = () => {};

  const selectTask = (taskId: string) => {
    dispatch({
      type: "SELECT_TASK",
      payload: taskId,
    });
  };

  const removeTask = (taskId: string) => {
    dispatch({
      type: "REMOVE_TASK",
      payload: taskId,
    });
  };

  const updateTask = (taskId: string, data: ITask) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        taskId: taskId,
        description: data.description,
        duration: data.duration,
        theme: data.theme,
      },
    });
  };
  return (
    <TaskContext.Provider
      value={{
        state,
        startTimer,
        pauseTimer,
        stopTimer,
        createTask,
        selectTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext)!;
};
