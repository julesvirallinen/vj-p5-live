import { useEffect, useState } from "react";
import { useSettingsStateContext } from "../Providers/SettingsProvider";
import {
  useCurrentSketchDispatchContext,
  useCurrentSketchStateContext,
} from "../Providers/SketchProvider";

export const useCurrentSketch = () => {
  const sketch = useCurrentSketchStateContext();

  const dispatchCurrentSketch = useCurrentSketchDispatchContext();

  const { compileAfterMs } = useSettingsStateContext();
  const [codeToCompile, setCodeToCompile] = useState(sketch.code);
  const [lastCompiledAt, setLastCompiledAt] = useState(new Date().getTime());
  const [lastKeystrokeAt, setLastKeystrokeAt] = useState(new Date().getTime());

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
    codeToCompile,
  };
};
