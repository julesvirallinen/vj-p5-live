import React from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useGlobalCommands } from "../hooks/useGlobalCommands";
import { useSettingsDispatchContext } from "./SettingsProvider";

/**
 * TODO: override ace shortcuts
 * customize ace shortcuts
 * TODO: figure out why shortcuts don't work in action bar
 */

const keyMap = {
  SHOW_MENU: "ctrl+m",
  SHOW_ACTION_BAR: "cmd+k",
  COMPILE: "cmd+enter",
};

interface IShortcutProviderProps {
  children: React.ReactNode;
}

export const ShortcutProvider: React.FC<IShortcutProviderProps> = ({
  children,
}) => {
  const dispatch = useSettingsDispatchContext();
  const { recompileSketch } = useGlobalCommands();

  const handlers = {
    SHOW_MENU: () => dispatch({ type: "toggleShowMenu" }),
    COMPILE: () => recompileSketch(),
    SHOW_ACTION_BAR: () => dispatch({ type: "toggleActionBar" }),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </GlobalHotKeys>
  );
};
