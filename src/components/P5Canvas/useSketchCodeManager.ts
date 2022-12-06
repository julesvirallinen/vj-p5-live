import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSettings } from "../../hooks/useSettings";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import Logger from "js-logger";

export const useSketchCodeManager = () => {
  const { code, id } = useCurrentSketch();
  const { compileAfterMs } = useSettings();
  const { codeHasSyntaxErrors } = useGlobalCommands();
  const [userCode, setUserCode] = useState(code);
  const [currentId, setCurrentId] = useState(id);

  // 2. debounce sets the user code
  const memoedDebounce = useMemo(
    () =>
      debounce(
        (code: string) => {
          setUserCode(code);
          Logger.debug(`Updated after debounce ${compileAfterMs}`);
        },
        compileAfterMs,
        { trailing: true }
      ),
    [compileAfterMs]
  );
  // 1. useEffect gets change from saved code and debounces update
  useEffect(() => {
    if (codeHasSyntaxErrors) {
      Logger.info("Not updating code, code has syntax errors");
    }
    memoedDebounce(code);
  }, [memoedDebounce, code, codeHasSyntaxErrors]);

  // always update code on id change
  useEffect(() => {
    if (currentId === id) return;
    memoedDebounce.cancel();
    setUserCode(code);
    setCurrentId(id);
  }, [id, code, currentId, memoedDebounce]);

  const forceLoadCode = useCallback(() => {
    Logger.info("Forced code reload, cancel debounce");
    setUserCode(code);
    setCurrentId(id);
    memoedDebounce.cancel();
  }, [code, id, memoedDebounce]);

  return { codeToRun: userCode, code, id, forceLoadCode };
};
