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

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (
        currentTime - lastCompiledAt > compileAfterMs &&
        // make smarter (see P5LIVE)
        sketch.code.length != codeToCompile.length
      ) {
        setCodeToCompile(sketch.code);
        setLastCompiledAt(new Date().getTime());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [sketch.code, codeToCompile, lastCompiledAt]);

  const updateSketch = (newCode: string) => {
    setLastCompiledAt(new Date().getTime());
    dispatchCurrentSketch({ type: "updateCode", payload: { code: newCode } });
  };

  return { updateSketch, ...sketch, codeToCompile };
};
