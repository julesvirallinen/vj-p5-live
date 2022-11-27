import { useCallback } from "react";
import {
  TMenu,
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";
import * as R from "ramda";

export const useSettings = () => {
  const dispatch = useSettingsDispatchContext();
  const { settings } = useSettingsStateContext();

  const setShowMenu = useCallback(
    (showMenu: boolean) => {
      dispatch({
        type: "patchSettings",
        payload: { showMenu },
      });
    },
    [dispatch]
  );

  const toggleShowMenu = useCallback(() => {
    setShowMenu(!settings.showMenu);
  }, [settings.showMenu, setShowMenu]);

  const setOpenMenu = useCallback(
    (menu: TMenu) => {
      dispatch({
        type: "patchSettings",
        payload: { openMenu: menu },
      });
    },
    [dispatch]
  );

  const setCanvasOpacity = useCallback(
    (opacity: number) => {
      dispatch({
        type: "patchSettings",
        payload: { canvasOpacity: R.clamp(0, 100, opacity) },
      });
    },
    [dispatch]
  );

  return {
    ...settings,
    toggleShowMenu,
    setOpenMenu,
    setShowMenu,
    setCanvasOpacity,
  };
};
