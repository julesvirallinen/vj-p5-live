import React, {
  createContext,
  FC,
  RefObject,
  useContext,
  useReducer,
} from 'react';
import * as R from 'ramda';
import { Path } from 'ramda';
import { PartialDeep } from 'type-fest';

import { defaultSettings } from '../../data/defaultSettings';
import { useLocalStorageData } from '../../hooks/useLocalStorage';
import { TColorPalette } from '../../models/colors';
import { TSrcScript } from '../../models/script';
import { ISettingsSketch } from '../../models/sketch';
import { TTheme } from '../ThemeProvider';

import { loadTutorialSketches } from './loadTutorialSketches';

import { useTutorials } from '~/hooks/useTutorials';
import { TSketchError } from '~/models/error';

export type TMenu =
  | 'sketches'
  | 'settings'
  | 'scripts'
  | 'palette'
  | 'about'
  | 'advanced';

export interface ISettings {
  themeOverrides: PartialDeep<TTheme>;
  hideEditor: boolean;
  sketches: ISettingsSketch[];
  showMenu: boolean;
  showConsoleFeed: boolean;
  openMenu: TMenu;
  showActionBar: boolean;
  loadedSketchId?: string;
  compileAfterMs: number;
  colorPalettes: TColorPalette[];
  /**
   * Scripts that are always loaded for all sketches
   */
  userLoadedScripts: TSrcScript[];
  maptasticEnabled: boolean;
  canvas: {
    percentDimmed: number;
  };
}

/** Omit settings from being saved to localstorage (IAppState["settings"]) */
export const NON_PERSISTED_SETTINGS_KEYS = [] as const;

export type TUserSavedSettings = PartialDeep<
  Omit<ISettings, typeof NON_PERSISTED_SETTINGS_KEYS[number]>
>;

export interface IAppState {
  settings: ISettings;
  sessionGlobals: {
    iframeKey: string;
    actionBarRef?: RefObject<HTMLInputElement>;
    canvasMediaStream?: MediaStream;
    canvasPopupOpen: boolean;
    canvasIframeRef?: RefObject<HTMLIFrameElement>;
    codeHasSyntaxErrors?: boolean;
    errors: TSketchError[];
  };
  globalCommands: {
    recompileSketch?: () => void;
    hardRecompileSketch?: () => void;
  };
}

export type IAction =
  | {
      type: 'addSketch';
      payload: ISettingsSketch;
    }
  | { type: 'setLoadedSketchId'; payload: { id: string } }
  | { type: 'setSettings'; payload: IAppState['settings'] }
  | { type: 'patchSettings'; payload: Partial<IAppState['settings']> }
  | {
      type: 'patchGlobalCommands';
      payload: Partial<IAppState['globalCommands']>;
    }
  | {
      type: 'patchSessionGlobals';
      payload: Partial<IAppState['sessionGlobals']>;
    };

const assocSettingsPath =
  (settings: IAppState) =>
  (path: Path) =>
  (val: unknown): IAppState =>
    R.assocPath(path, val, settings);

const initialState: IAppState = {
  settings: defaultSettings,
  globalCommands: {},
  sessionGlobals: {
    // used to refresh iframe on change
    iframeKey: 'new',
    canvasPopupOpen: false,
    errors: [],
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
  const assocSketches = assoc(['settings', 'sketches']);
  switch (action.type) {
    case 'addSketch':
      return assocSketches(R.union([action.payload], state.settings.sketches));
    case 'setLoadedSketchId':
      return assoc(['settings', 'loadedSketchId'])(action.payload.id);
    case 'setSettings':
      return assoc(['settings'])(action.payload);
    case 'patchSettings':
      return assoc(['settings'])(
        R.mergeDeepLeft(action.payload, state.settings)
      );
    case 'patchGlobalCommands': {
      return assoc(['globalCommands'])(
        R.mergeDeepLeft(action.payload, state.globalCommands)
      );
    }
    case 'patchSessionGlobals': {
      return assoc(['sessionGlobals'])(
        R.mergeDeepLeft(action.payload, state.sessionGlobals)
      );
    }
    default:
      throw new Error(`${(action as IAction).type} not supported`);
  }
};

export const SettingsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getSettings, setSettings } = useLocalStorageData();
  const { tutorials } = useTutorials();

  const updateSettings = (state: IAppState) =>
    setSettings(R.omit(NON_PERSISTED_SETTINGS_KEYS, state.settings));

  const [state, dispatch] = useReducer(
    R.pipe(reducer, R.tap(updateSettings)),
    initialState,
    (initial) => {
      const savedSettings = getSettings() || {};
      const withTutorials = loadTutorialSketches(savedSettings, tutorials);

      return R.mergeDeepLeft({ settings: withTutorials }, initial) as IAppState;
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
