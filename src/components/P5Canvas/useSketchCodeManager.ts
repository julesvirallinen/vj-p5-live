import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "./snippets";
import * as R from "ramda";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSettings } from "../../hooks/useSettings";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

export const useSketchCodeManager = () => {
  const { code } = useCurrentSketch();
  const { compileAfterMs } = useSettings();
  const { codeHasSyntaxErrors } = useGlobalCommands();
  const [userCode, setUserCode] = useState(code);
  const [fullCodeToCompile, setFullCodeToCompile] = useState(userCode);

  // 2. debounce sets the user code
  const memoedDebounce = useMemo(
    () => debounce((code: string) => setUserCode(code), compileAfterMs),
    [compileAfterMs]
  );
  // 1. useEffect gets change from saved code and debounces update
  useEffect(() => {
    memoedDebounce(code);
  }, [memoedDebounce, code]);

  // 3. the user code is modified and run if the editor has not noticed syntax problems (takes a second, debounce helps)
  useEffect(() => {
    if (codeHasSyntaxErrors) return;
    R.pipe(replaceLetConstWithVar, setFullCodeToCompile)(userCode);
  }, [userCode, setFullCodeToCompile, codeHasSyntaxErrors]);

  const html = `

    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}
    ${fullCodeToCompile}


`;

  return html;
};
