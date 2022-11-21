import { useCallback } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useCurrentSketchContext } from "./currentSketchProvider";

/**
 * TODO: override ace shortcuts
 * customize ace shortcuts
 */

const keyMap = {
  COMPILE: "ctrl+enter",
};

interface IShortcutProviderProps {
  children: React.ReactNode;
}

export const ShortcutProvider: React.FC<IShortcutProviderProps> = ({
  children,
}) => {
  const { setShouldRecompileAt } = useCurrentSketchContext();

  const updateShouldRecompile = useCallback(() => {
    setShouldRecompileAt(new Date().getTime());
  }, [setShouldRecompileAt]);

  const handlers = {
    COMPILE: updateShouldRecompile,
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </GlobalHotKeys>
  );
};
