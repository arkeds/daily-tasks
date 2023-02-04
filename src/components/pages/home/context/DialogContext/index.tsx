import { createContext, FC, ReactNode, useContext, useReducer } from "react";

interface IProps {
  children: ReactNode;
}

interface IDialogueState {
  visible: boolean;
  mode: "CREATE" | "EDIT";
}

interface IDialogueAction {
  type: string;
  payload?: any;
}

interface IDialogueContext {
  state: IDialogueState;
  closeDialogue: () => void;
  openDialogue: (mode: string) => void;
}

const initialState: IDialogueState = {
  visible: false,
  mode: "CREATE",
};

const DialogueContext = createContext<IDialogueContext | null>(null);

export const DialogueContextProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: IDialogueState, action: IDialogueAction) => {
      const { type, payload } = action;
      switch (type) {
        case "OPEN_DIALOGUE":
          return {
            ...state,
            visible: true,
            mode: payload,
          };
        case "CLOSE_DIALOGUE":
          return {
            ...state,
            visible: false,
          };
        default: {
          return state;
        }
      }
    },
    initialState
  );

  const closeDialogue = () => {
    dispatch({
      type: "CLOSE_DIALOGUE",
    });
  };

  const openDialogue = (mode: string) => {
    dispatch({
      type: "OPEN_DIALOGUE",
      payload: mode,
    });
  };
  return (
    <DialogueContext.Provider value={{ state, closeDialogue, openDialogue }}>
      {children}
    </DialogueContext.Provider>
  );
};

export const useDialogueContext = () => {
  return useContext(DialogueContext)!;
};
