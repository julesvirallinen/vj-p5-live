import React, {
  createContext,
  FC,
  RefObject,
  useContext,
  useReducer,
} from "react";
import * as R from "ramda";
import { Path } from "ramda";
import { PartialDeep } from "type-fest";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TSrcScript } from "../../models/script";
import { ISettingsSketch } from "../../models/sketch";
import { TTheme } from "../ThemeProvider";

/** Omit settings from being saved to localstorage (IAppState["settings"]) */
export const NON_PERSISTED_SETTINGS_KEYS = [];

export type TMenu = "sketches" | "settings" | "scripts";

export interface IAppState {
  settings: {
    themeOverrides: PartialDeep<TTheme>;
    hideEditor: boolean;
    sketches: ISettingsSketch[];
    showMenu: boolean;
    showConsoleFeed: boolean;
    openMenu: TMenu;
    showActionBar: boolean;
    loadedSketchId?: string;
    compileAfterMs: number;
    /**
     * Scripts that are always loaded for all sketches
     */
    userLoadedScripts: TSrcScript[];
    maptasticEnabled: boolean;
    canvas: {
      percentDimmed: number;
    };
  };
  sessionGlobals: {
    iframeKey: string;
    actionBarRef?: RefObject<HTMLInputElement>;
    canvasMediaStream?: MediaStream;
    canvasPopupOpen: boolean;
    canvasIframeRef?: RefObject<HTMLIFrameElement>;
    codeHasSyntaxErrors?: boolean;
  };
  globalCommands: {
    recompileSketch?: () => void;
    hardRecompileSketch?: () => void;
  };
}

export type IAction =
  | {
      type: "addSketch";
      payload: ISettingsSketch;
    }
  | { type: "toggleShowMenu" }
  | { type: "toggleActionBar" }
  | { type: "setLoadedSketchId"; payload: { id: string } }
  | { type: "setSettings"; payload: IAppState["settings"] }
  | { type: "patchSettings"; payload: Partial<IAppState["settings"]> }
  | { type: "setUserLoadedScripts"; payload: TSrcScript[] }
  | {
      type: "patchGlobalCommands";
      payload: Partial<IAppState["globalCommands"]>;
    }
  | {
      type: "patchSessionGlobals";
      payload: Partial<IAppState["sessionGlobals"]>;
    };

const assocSettingsPath =
  (settings: IAppState) =>
  (path: Path) =>
  (val: unknown): IAppState =>
    R.assocPath(path, val, settings);

const initialState: IAppState = {
  settings: {
    hideEditor: false,
    themeOverrides: {},
    sketches: [],
    showMenu: true,
    openMenu: "sketches",
    showConsoleFeed: true,
    showActionBar: true,
    compileAfterMs: 1000,
    userLoadedScripts: [],
    canvas: {
      percentDimmed: 1,
    },
    maptasticEnabled: false,
  },
  globalCommands: {},
  sessionGlobals: {
    // used to refresh iframe on change
    iframeKey: "new",
    canvasPopupOpen: false,
  },
};

// context for using state
const SettingsStateContext = createContext<IAppState>({} as IAppState);

// context for updating state
const SettingsDispatchContext = createContext<React.Dispatch<IAction>>(
  () => ({})
);

const reducer = (state: IAppState, action: IAction): IAppState => {
  const assoc = assocSettingsPath(state);
  const assocSketches = assoc(["settings", "sketches"]);
  switch (action.type) {
    case "addSketch":
      return assocSketches(R.union([action.payload], state.settings.sketches));
    case "toggleShowMenu":
      return assoc(["settings", "showMenu"])(!state.settings.showMenu);
    case "toggleActionBar":
      return assoc(["settings", "showActionBar"])(
        !state.settings.showActionBar
      );
    case "setLoadedSketchId":
      return assoc(["settings", "loadedSketchId"])(action.payload.id);
    case "setSettings":
      return assoc(["settings"])(action.payload);
    case "patchSettings":
      return assoc(["settings"])(
        R.mergeDeepLeft(action.payload, state.settings)
      );

    case "patchGlobalCommands": {
      return assoc(["globalCommands"])(
        R.mergeDeepLeft(action.payload, state.globalCommands)
      );
    }
    case "patchSessionGlobals": {
      return assoc(["sessionGlobals"])(
        R.mergeDeepLeft(action.payload, state.sessionGlobals)
      );
    }
    case "setUserLoadedScripts": {
      return assoc(["settings", "userLoadedScripts"])(action.payload);
    }
    default:
      throw new Error(`${(action as IAction).type} not supported`);
  }
};

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setItem, getItem } = useLocalStorage();

  const updateSettings = (state: IAppState) =>
    setItem("settings", R.omit(NON_PERSISTED_SETTINGS_KEYS, state.settings));

  const [state, dispatch] = useReducer(
    R.pipe(reducer, R.tap(updateSettings)),
    initialState,
    (initial) => {
      const fromStorage = getItem<IAppState>("settings");
      if (fromStorage) {
        return R.mergeDeepLeft({ settings: fromStorage }, initial);
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

/** Don't use this directly, use abstraction like useSettings */
export const useSettingsStateContext = () => useContext(SettingsStateContext);
export const useSettingsDispatchContext = () =>
  useContext(SettingsDispatchContext);
