import { createContext, FC, useContext, useReducer } from "react";
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
  (path: Path) =>
  (val: unknown): ISettings =>
    R.assocPath(path, val, settings);

const initialState = { sketches: ["sketch", "wohoo"] };

// context for using state
const SettingsStateContext = createContext<ISettings>({} as ISettings);

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

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsDispatchContext.Provider value={dispatch}>
      <SettingsStateContext.Provider value={state}>
        {children}
      </SettingsStateContext.Provider>
    </SettingsDispatchContext.Provider>
  );
};

// use them context we've created
export const useSettingsStateContext = () => useContext(SettingsStateContext);
export const useSettingsDispatchContext = () =>
  useContext(SettingsDispatchContext);
