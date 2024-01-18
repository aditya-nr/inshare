import { createContext } from "react";
import { Action, AppState, ContextProps } from "../types";

export const IntialState = {
  roomId: "",
  name: "",
  timeOut: 0,
};
export const AppContext = createContext<ContextProps>({
  state: IntialState,
  dispatch: () => {},
});

export const Reducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "UPDATE_ROOM":
      return {
        roomId: action.roomId,
        name: action.name,
        timeOut: action.timeOut,
      };
    default:
      console.log("NO matching action");
      return state;
  }
};
