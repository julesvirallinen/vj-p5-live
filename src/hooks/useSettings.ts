import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";

export const useSettings = () => {
  const dispatch = useSettingsDispatchContext();
  const { settings } = useSettingsStateContext();

  return { ...settings };
};
