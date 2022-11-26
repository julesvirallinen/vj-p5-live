import React from "react";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { useGlobalCommands } from "../hooks/useGlobalCommands";
import { useSketchManager } from "../hooks/useSketchManager";
import { useSettingsDispatchContext } from "./SettingsProvider";

/**
 * TODO: override ace shortcuts
 * customize ace shortcuts
 * TODO: figure out why shortcuts don't work in action bar
 */

const keyMap = {
  SHOW_MENU: "ctrl+m",
  SHOW_ACTION_BAR: "cmd+k",
  COMPILE: "ctrl+enter",
  HARD_COMPILE: "ctrl+shift+enter",
};

interface IShortcutProviderProps {
  children: React.ReactNode;
}

configure({ ignoreTags: [] });

export const ShortcutProvider: React.FC<IShortcutProviderProps> = ({
  children,
}) => {
  const dispatch = useSettingsDispatchContext();
  const { recompileSketch, hardRecompileSketch } = useGlobalCommands();
  const { reloadSketch } = useSketchManager();

  const handlers = {
    SHOW_MENU: () => dispatch({ type: "toggleShowMenu" }),
    COMPILE: () => recompileSketch(),
    HARD_COMPILE: () => reloadSketch(),
    SHOW_ACTION_BAR: () => dispatch({ type: "toggleActionBar" }),
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      {children}
    </GlobalHotKeys>
  );
};
