import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  useRef,
} from "react";
import * as R from "ramda";
import { Path } from "ramda";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const NON_PERSISTED_KEYS = ["internal", "compileAfterMs"];

export interface ISettings {
  sketches: { name: string; id: string }[];
  showMenu: boolean;
  loadedSketchId?: string;
  compileAfterMs: number;
  internal: { lastHardCompiledAt: number };
}

export type IAction =
  | {
      type: "addSketch";
      payload: { name: string; id: string };
    }
  | { type: "toggleShowMenu" }
  | { type: "setLoadedSketchId"; payload: { id: string } }
  | { type: "resetCanvasKey" };

const assocSettingsPath =
  (settings: ISettings) =>
  (path: Path) =>
  (val: unknown): ISettings =>
    R.assocPath(path, val, settings);

const initialState: ISettings = {
  sketches: [],
  showMenu: true,
  compileAfterMs: 500,
  internal: {
    lastHardCompiledAt: new Date().getTime(),
  },
};

// context for using state
const SettingsStateContext = createContext<ISettings>({} as ISettings);

// context for updating state
const SettingsDispatchContext = createContext<React.Dispatch<IAction>>(
  () => ({})
);

const reducer = (settings: ISettings, action: IAction): ISettings => {
  const assoc = assocSettingsPath(settings);
  const assocSketches = assoc(["sketches"]);
  switch (action.type) {
    case "addSketch":
      return assocSketches(R.union([action.payload], settings.sketches));
    case "toggleShowMenu":
      return assoc(["showMenu"])(!settings.showMenu);
    case "setLoadedSketchId":
      return assoc(["loadedSketchId"])(action.payload.id);
    case "resetCanvasKey":
      return assoc(["internal", "lastHardCompiledAt"])(new Date().getTime());
    default:
      throw new Error();
  }
};

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setItem, getItem } = useLocalStorage();

  const updateSettings = (settings: ISettings) =>
    setItem("settings", R.omit(NON_PERSISTED_KEYS, settings));

  const [state, dispatch] = useReducer(
    R.pipe(reducer, R.tap(updateSettings)),
    initialState,
    (initial) => {
      const fromStorage = getItem<ISettings>("settings");
      if (fromStorage) {
        return R.mergeLeft(fromStorage, initial);
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
