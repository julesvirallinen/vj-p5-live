import { useEffect, useMemo, useState } from "react";
import { ISettingsSketch } from "../models/sketch";
import {
  useCurrentSketchDispatchContext,
  useCurrentSketchStateContext,
} from "../providers/SketchProvider";
import { useSettings } from "./useSettings";

export const useCurrentSketch = () => {
  const sketch = useCurrentSketchStateContext();
  const { sketches } = useSettings();

  const currentSketchData = useMemo(() => {
    const sketchData = sketches.find((s) => s.id == sketch.id);

    if (!sketchData) {
      console.error("no sketch saved");
    }
    return sketchData;
  }, [sketch.id, sketches]) as ISettingsSketch;

  const dispatchCurrentSketch = useCurrentSketchDispatchContext();

  const { compileAfterMs } = useSettings();
  const [codeToCompile, setCodeToCompile] = useState(sketch.code);
  const [lastCompiledAt, setLastCompiledAt] = useState(new Date().getTime());
  const [lastKeystrokeAt, setLastKeystrokeAt] = useState(new Date().getTime());

  // This logic doesn't quite work right yet, need to investigate!
  useEffect(() => {
    const currentTime = new Date().getTime();
    const interval = setInterval(() => {
      if (
        currentTime - lastKeystrokeAt >
        compileAfterMs
        // make smarter (see P5LIVE)
        // && sketch.code.length != codeToCompile.length
      ) {
        setCodeToCompile(sketch.code);
        setLastCompiledAt(new Date().getTime());
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [
    sketch.code,
    codeToCompile,
    lastCompiledAt,
    compileAfterMs,
    lastKeystrokeAt,
  ]);

  useEffect(() => {
    setLastCompiledAt(0);
  }, [sketch.id]);

  const updateSketch = (newCode: string) => {
    dispatchCurrentSketch({ type: "updateCode", payload: { code: newCode } });
    setLastKeystrokeAt(new Date().getTime());
  };

  return {
    updateSketch,
    ...sketch,
    ...currentSketchData,
    codeToCompile,
  };
};
