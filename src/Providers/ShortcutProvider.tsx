import React from "react";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { useGlobalCommands } from "../hooks/useGlobalCommands";
import { useSettings } from "../hooks/useSettings";
import { useSketchManager } from "../hooks/useSketchManager";
import { useSettingsDispatchContext } from "./SettingsProvider";

/**
 * TODO: override ace shortcuts
 * customize ace shortcuts
 * TODO: figure out why shortcuts don't work in action bar
 */

const keyMap = {
  SHOW_MENU: "ctrl+m",
  SHOW_ACTION_BAR: "cmd+p",
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
  const { recompileSketch } = useGlobalCommands();
  const { toggleActionBar, toggleShowMenu } = useSettings();
  const { reloadSketch } = useSketchManager();

  const handlers = {
    SHOW_MENU: () => toggleShowMenu(),
    COMPILE: () => recompileSketch(),
    HARD_COMPILE: () => reloadSketch(),
    SHOW_ACTION_BAR: (event: KeyboardEvent | undefined) => {
      event?.preventDefault();

      toggleActionBar();
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      {children}
    </GlobalHotKeys>
  );
};
