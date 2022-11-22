import React, { createContext, FC, useContext, useReducer } from "react";
import * as R from "ramda";
import { Path } from "ramda";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { defaultSketchCode } from "../SketchProvider";

export interface ISettings {
  sketches: { name: string; id: string }[];
  showMenu: boolean;
}

export type IAction =
  | {
      type: "addSketch";
      payload: { name: string; id: string };
    }
  | { type: "toggleShowMenu" };

const assocSettingsPath =
  (settings: ISettings) =>
  (path: Path) =>
  (val: unknown): ISettings =>
    R.assocPath(path, val, settings);

const initialState: ISettings = {
  sketches: [],
  showMenu: true,
};

// context for using state
const SettingsStateContext = createContext<ISettings>({} as ISettings);

// context for updating state
const SettingsDispatchContext = createContext<React.Dispatch<IAction>>(
  () => {}
);

const reducer = (settings: ISettings, action: IAction): ISettings => {
  const assoc = assocSettingsPath(settings);
  const assocSketches = assoc(["sketches"]);

  switch (action.type) {
    case "addSketch":
      return assocSketches(R.union([action.payload], settings.sketches));
    case "toggleShowMenu":
      return assoc(["showMenu"])(!settings.showMenu);
    default:
      throw new Error();
  }
};

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setItem, getItem } = useLocalStorage();
  const updateSettings = (settings: ISettings) => setItem("settings", settings);

  const [state, dispatch] = useReducer(
    R.pipe(reducer, R.tap(updateSettings)),
    initialState,
    (initial) => {
      const fromStorage = getItem<ISettings>("settings");
      console.log();
      if (fromStorage) {
        return fromStorage;
      }
      return initial;
    }
  );

  return (
    <SettingsDispatchContext.Provider value={dispatch}>
      <SettingsStateContext.Provider value={state}>
        {children}
      </SettingsStateContext.Provider>
    </SettingsDispatchContext.Provider>
  );
};

export const useSettingsStateContext = () => useContext(SettingsStateContext);
export const useSettingsDispatchContext = () =>
  useContext(SettingsDispatchContext);
