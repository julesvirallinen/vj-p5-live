import React from "react";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { useGlobalCommands } from "../hooks/useGlobalCommands";
import { useSettings } from "../hooks/useSettings";
import { useSketchManager } from "../hooks/useSketchManager";

/**
 * TODO: override ace shortcuts
 */

const keyMap = {
  SHOW_MENU: "ctrl+m",
  SHOW_ACTION_BAR: "cmd+p",
  COMPILE: "ctrl+enter",
  HARD_COMPILE: "ctrl+shift+enter",
  TOGGLE_CODE_VISIBLE: "ctrl+h",
};

interface IShortcutProviderProps {
  children: React.ReactNode;
}

configure({ ignoreTags: [] });

export const ShortcutProvider: React.FC<IShortcutProviderProps> = ({
  children,
}) => {
  const { recompileSketch } = useGlobalCommands();
  const { toggleActionBar, toggleShowMenu, toggleHideEditor } = useSettings();
  const { reloadSketch } = useSketchManager();

  const handlers = {
    SHOW_MENU: () => toggleShowMenu(),
    TOGGLE_CODE_VISIBLE: () => toggleHideEditor(),
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
