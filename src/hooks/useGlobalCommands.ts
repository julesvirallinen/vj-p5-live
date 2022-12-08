import { RefObject, useCallback } from "react";

import {
  IAppState,
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../providers/SettingsProvider";

const runCommand =
  (globalCommands: IAppState["globalCommands"]) =>
  (command: keyof IAppState["globalCommands"]) => {
    const fn = globalCommands[command];

    if (fn) {
      fn();
    } else {
      console.error(`${command} sketch not set`);
    }
  };

export const useGlobalCommands = () => {
  const dispatch = useSettingsDispatchContext();
  const { globalCommands, sessionGlobals } = useSettingsStateContext();
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
  const setIframeKey = useCallback(
    (key: string) => {
      dispatch({ type: "patchSessionGlobals", payload: { iframeKey: key } });
    },
    [dispatch]
  );
  const setActionBarRef = useCallback(
    (ref: RefObject<HTMLInputElement>) => {
      dispatch({ type: "patchSessionGlobals", payload: { actionBarRef: ref } });
    },
    [dispatch]
  );
  const setIframeRef = useCallback(
    (ref: RefObject<HTMLIFrameElement>) => {
      dispatch({
        type: "patchSessionGlobals",
        payload: { canvasIframeRef: ref },
      });
    },
    [dispatch]
  );
  const setCanvasMediaStream = useCallback(
    (canvasMediaStream: MediaStream) => {
      dispatch({
        type: "patchSessionGlobals",
        payload: { canvasMediaStream },
      });
    },
    [dispatch]
  );
  const setCanvasPopupOpen = useCallback(
    (canvasPopupOpen: boolean) => {
      dispatch({
        type: "patchSessionGlobals",
        payload: { canvasPopupOpen },
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

  const setCodeHasSyntaxErrors = (hasErrors: boolean) =>
    dispatch({
      type: "patchSessionGlobals",
      payload: { codeHasSyntaxErrors: hasErrors },
    });

  const recompileSketch = () => run("recompileSketch");
  const hardRecompileSketch = () => run("hardRecompileSketch");

  return {
    recompileSketch,
    setRecompileSketch,
    setHardRecompileSketch,
    hardRecompileSketch,
    setIframeKey,
    setActionBarRef,
    setCanvasMediaStream,
    setIframeRef,
    setCodeHasSyntaxErrors,
    setCanvasPopupOpen,
    ...sessionGlobals,
  };
};
