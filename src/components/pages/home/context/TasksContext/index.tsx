import { createContext, FC, ReactNode, useContext, useReducer } from "react";

interface IProps {
  children: ReactNode;
}

export interface ITask {
  id: string;
  description: string;
  duration: number;
  state: "UNSTARTED" | "STARTED" | "PAUSED" | "ENDED";
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
  createTask: (task: ITask) => void;
  startTimer: (taskId: string) => void;
  pauseTimer: (taskId: string) => void;
  stopTimer: (taskId: string) => void;
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
              [payload.key]: payload.task,
            },
          };
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
  return (
    <TaskContext.Provider
      value={{ state, startTimer, pauseTimer, stopTimer, createTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext)!;
};
