import { useCallback } from "react";
import {
  IAppState,
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";

const runCommand =
  (globalCommands: IAppState["globalCommands"]) =>
  (command: keyof IAppState["globalCommands"]) => {
    const fn = globalCommands[command];

    if (fn) {
      console.log(`running ${command}`);
      fn();
    } else {
      console.error(`${command} sketch not set`);
    }
  };

export const useGlobalCommands = () => {
  const dispatch = useSettingsDispatchContext();
  const { globalCommands } = useSettingsStateContext();
  const run = runCommand(globalCommands);
  const setRecompileSketch = useCallback(
    (fn: () => void) => {
      dispatch({
        type: "patchGlobalCommands",
        payload: { recompileSketch: fn },
      });
    },
    [dispatch]
  );

  const setHardRecompileSketch = useCallback(
    (fn: () => void) => {
      dispatch({
        type: "patchGlobalCommands",
        payload: { hardRecompileSketch: fn },
      });
    },
    [dispatch]
  );

  const recompileSketch = () => run("recompileSketch");
  const hardRecompileSketch = () => run("hardRecompileSketch");

  return {
    recompileSketch,
    setRecompileSketch,
    setHardRecompileSketch,
    hardRecompileSketch,
  };
};
