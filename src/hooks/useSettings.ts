import { useCallback } from "react";
import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";

export const useSettings = () => {
  const dispatch = useSettingsDispatchContext();
  const { settings } = useSettingsStateContext();

  const toggleShowMenu = useCallback(() => {
    dispatch({
      type: "patchSettings",
      payload: { showMenu: !settings.showMenu },
    });
  }, [dispatch, settings.showMenu]);

  return { ...settings, toggleShowMenu };
};
