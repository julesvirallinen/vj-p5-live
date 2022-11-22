import { GlobalHotKeys } from "react-hotkeys";
import { useSettingsDispatchContext } from "./SettingsProvider";

/**
 * TODO: override ace shortcuts
 * customize ace shortcuts
 */

const keyMap = {
  SHOW_MENU: "ctrl+m",
};

interface IShortcutProviderProps {
  children: React.ReactNode;
}

export const ShortcutProvider: React.FC<IShortcutProviderProps> = ({
  children,
}) => {
  const dispatch = useSettingsDispatchContext();

  const handlers = {
    SHOW_MENU: () => dispatch({ type: "toggleShowMenu" }),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </GlobalHotKeys>
  );
};
