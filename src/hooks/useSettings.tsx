import { createContext, useContext, useReducer } from "react";
import * as R from "ramda";
import { Path } from "ramda";

export interface ISettings {
  sketches: string[];
}

export type IAction = {
  type: "addSketch";
  payload: { sketchId: string };
};

const assocSettingsPath =
  (settings: ISettings) =>
  <T>(path: Path) =>
  (val: T): ISettings =>
    R.assocPath(path, val, settings);

const initialState = { sketches: [] };

// context for using state
const SettingsStateContext = createContext({});

// context for updating state
const SettingsDispatchContext = createContext({});

const reducer = (settings: ISettings, action: IAction): ISettings => {
  const assoc = assocSettingsPath(settings);
  const assocSketches = assoc(["sketches"]);

  switch (action.type) {
    case "addSketch":
      return assocSketches(R.union([action.payload.sketchId]));

    default:
      throw new Error();
  }
};


export const ToggleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    sketches: []
  })

  return (
    <SettingsDispatchContext.Provider value={dispatch}>
        <SettingsStateContext.Provider value={state}>
           {children}
        </ToggleStateContext.Provider>
    </ToggleDispatchContext.Provider>
  )
}

// use them context we've created
export const useToggleStateContext = () => useContext(SettingsStateContext)
export const useToggleDispatchContext = () => useContext(SettingsDispatchContext)
