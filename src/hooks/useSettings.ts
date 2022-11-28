import { useCallback } from "react";
import {
  TMenu,
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";
import * as R from "ramda";
import { Path } from "ramda";
import { useGlobalCommands } from "./useGlobalCommands";
import { TSrcScript } from "../models/script";

export const useSettings = () => {
  const dispatch = useSettingsDispatchContext();
  const { settings } = useSettingsStateContext();
  const { actionBarRef } = useGlobalCommands();

  const patchSettings = useCallback(
    (path: Path, value: unknown) => {
      dispatch({
        type: "patchSettings",
        payload: R.assocPath(path, value, {}),
      });
    },
    [dispatch]
  );

  const setShowMenu = useCallback(
    (showMenu: boolean) => {
      patchSettings(["showMenu"], showMenu);
    },
    [patchSettings]
  );
  const setUserLoadedScripts = useCallback(
    (scripts: TSrcScript[]) => {
      patchSettings(["userLoadedScripts"], scripts);
    },
    [patchSettings]
  );

  const toggleShowMenu = useCallback(() => {
    setShowMenu(!settings.showMenu);
  }, [settings.showMenu, setShowMenu]);

  const setOpenMenu = useCallback(
    (menu: TMenu) => patchSettings(["openMenu"], menu),
    [patchSettings]
  );

  const setCanvasDimmedPercent = useCallback(
    (percentDimmed: number) =>
      patchSettings(
        ["canvas", "percentDimmed"],
        R.clamp(0, 100, percentDimmed)
      ),
    [patchSettings]
  );

  const setEditorBackgroundColor = useCallback(
    (color: string) =>
      patchSettings(["themeOverrides", "editor", "textBackground"], color),
    [patchSettings]
  );

  const setEditorTextColor = useCallback(
    (color: string) =>
      patchSettings(["themeOverrides", "editor", "textColor"], color),

    [patchSettings]
  );
  const setThemePrimaryColor = useCallback(
    (color: string) =>
      patchSettings(["themeOverrides", "colors", "primary"], color),

    [patchSettings]
  );

  const toggleActionBar = useCallback(() => {
    const setActionbarVisible = (value: boolean) =>
      patchSettings(["showActionBar"], value);

    if (document.activeElement === actionBarRef?.current) {
      actionBarRef.current?.blur();
      return setActionbarVisible(false);
    }

    actionBarRef?.current?.focus();
    return setActionbarVisible(true);
  }, [actionBarRef, patchSettings]);

  return {
    ...settings,
    toggleShowMenu,
    setOpenMenu,
    setShowMenu,
    setCanvasDimmedPercent,
    setEditorBackgroundColor,
    setEditorTextColor,
    setThemePrimaryColor,
    toggleActionBar,
    setUserLoadedScripts,
  };
};
