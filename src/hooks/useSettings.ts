import { useCallback } from 'react';
import * as R from 'ramda';
import { Path } from 'ramda';

import { TSrcScript } from '../models/script';
import {
  TMenu,
  useSettingsDispatchContext,
  useSettingsStateContext,
} from '../providers/SettingsProvider';

import { useGlobalCommands } from './useGlobalCommands';

export const useSettings = () => {
  const dispatch = useSettingsDispatchContext();
  const { settings } = useSettingsStateContext();
  const { actionBarRef } = useGlobalCommands();

  const patchSettings = useCallback(
    (path: Path, value: unknown) => {
      dispatch({
        type: 'patchSettings',
        payload: R.assocPath(path, value, {}),
      });
    },
    [dispatch]
  );

  const setShowMenu = useCallback(
    (showMenu: boolean) => {
      patchSettings(['showMenu'], showMenu);
    },
    [patchSettings]
  );

  const setUserLoadedScripts = useCallback(
    (scripts: TSrcScript[]) => {
      patchSettings(['userLoadedScripts'], scripts);
    },
    [patchSettings]
  );

  const toggleShowMenu = useCallback(() => {
    setShowMenu(!settings.showMenu);
  }, [settings.showMenu, setShowMenu]);

  const toggleHideEditor = useCallback(() => {
    patchSettings(['hideEditor'], !settings.hideEditor);
  }, [settings.hideEditor, patchSettings]);

  const setOpenMenu = useCallback(
    (menu: TMenu) => patchSettings(['openMenu'], menu),
    [patchSettings]
  );

  const setCanvasDimmedPercent = useCallback(
    (percentDimmed: number) =>
      patchSettings(
        ['canvas', 'percentDimmed'],
        R.clamp(0, 100, percentDimmed)
      ),
    [patchSettings]
  );

  const setEditorBackgroundColor = useCallback(
    (color: string) =>
      patchSettings(['themeOverrides', 'editor', 'textBackground'], color),
    [patchSettings]
  );

  const setEditorTextColor = useCallback(
    (color: string) =>
      patchSettings(['themeOverrides', 'editor', 'textColor'], color),

    [patchSettings]
  );

  const setThemePrimaryColor = useCallback(
    (color: string) =>
      patchSettings(['themeOverrides', 'colors', 'primary'], color),

    [patchSettings]
  );

  const setThemeSecondaryColor = useCallback(
    (color: string) =>
      patchSettings(['themeOverrides', 'colors', 'secondary'], color),

    [patchSettings]
  );

  const setCompileAfterMs = (ms: number) =>
    patchSettings(['compileAfterMs'], ms);

  const toggleActionBar = useCallback(() => {
    const setActionbarVisible = (value: boolean) =>
      patchSettings(['showActionBar'], value);

    if (document.activeElement === actionBarRef?.current) {
      actionBarRef.current?.blur();

      return setActionbarVisible(false);
    }

    actionBarRef?.current?.focus();

    return setActionbarVisible(true);
  }, [actionBarRef, patchSettings]);

  const setMaptasticEnabled = (enabled: boolean) =>
    patchSettings(['maptasticEnabled'], enabled);

  const toggleShowConsoleFeed = () =>
    patchSettings(['showConsoleFeed'], !settings.showConsoleFeed);

  return {
    ...settings,
    toggleShowMenu,
    setOpenMenu,
    setShowMenu,
    setCanvasDimmedPercent,
    setEditorBackgroundColor,
    setEditorTextColor,
    setThemePrimaryColor,
    setThemeSecondaryColor,
    toggleActionBar,
    toggleHideEditor,
    setUserLoadedScripts,
    setCompileAfterMs,
    setMaptasticEnabled,
    toggleShowConsoleFeed,
    patchSettings,
  };
};
