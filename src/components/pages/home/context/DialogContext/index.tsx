import { createContext, FC, ReactNode, useContext, useReducer } from "react";

interface IProps {
  children: ReactNode;
}

interface IDialogueState {
  visible: boolean;
}

interface IDialogueAction {
  type: string;
  payload?: any;
}

interface IDialogueContext {
  state: IDialogueState;
  closeDialogue: () => void;
  openDialogue: () => void;
}

const initialState: IDialogueState = {
  visible: false,
};

const DialogueContext = createContext<IDialogueContext | null>(null);

export const DialogueContextProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: IDialogueState, action: IDialogueAction) => {
      const { type } = action;
      switch (type) {
        case "OPEN_DIALOGUE":
          return {
            ...state,
            visible: true,
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

  const openDialogue = () => {
    dispatch({
      type: "OPEN_DIALOGUE",
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
