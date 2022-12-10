import { useCallback, useEffect, useState } from "react";
import Logger from "js-logger";

import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSketchCodeManager } from "../../hooks/useSketchCodeManager";

/**
 * Handles logic relating to recompiling / resetting the canvas
 *
 */
export const useRecompileCanvas = () => {
  const { forceLoadCode } = useSketchCodeManager();

  const {
    setRecompileSketch: setGlobalRecompileSketch,
    setHardRecompileSketch,
  } = useGlobalCommands();

  const [iframeKey, setIframeKey] = useState(new Date().getTime());
  const [sketchLoaded, setSketchLoaded] = useState(false);

  const [recompileSketch, setRecompileSketch] =
    useState<() => void | undefined>();

  const remountCanvas = useCallback(() => {
    const canvasKey = new Date().getTime();
    setIframeKey(canvasKey);
    setSketchLoaded(false);
  }, []);

  const compileSketch = useCallback(() => {
    forceLoadCode();

    if (!recompileSketch) {
      return Logger.warn("recompile sketch missing");
    }
    recompileSketch();
  }, [forceLoadCode, recompileSketch]);

  useEffect(() => {
    setHardRecompileSketch(remountCanvas);
    setGlobalRecompileSketch(compileSketch);
  }, [
    setHardRecompileSketch,
    remountCanvas,
    compileSketch,
    setGlobalRecompileSketch,
  ]);

  return { iframeKey, sketchLoaded, setRecompileSketch, setSketchLoaded };
};
