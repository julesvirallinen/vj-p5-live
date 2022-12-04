import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "./snippets";
import * as R from "ramda";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSettings } from "../../hooks/useSettings";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";

// sorry for the regex :(

// matches const loadScripts = [ANYTHING HERE]
// P5LIVE syntax for compatability
const matchScripts = /^[\w]?(let |const |var )libs = \[(?<scriptTags>.*)(\])/gm;

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

const extractUserScripts = (code: string) => {
  const match = matchScripts.exec(code);

  const scripts = R.pipe(
    // get script group or empty string
    R.pathOr<string>("", ["groups", "scriptTags"]),
    // split scripts with comma
    R.split(","),
    // remove quotes from each url
    R.map(R.replace(/['"]+/g, ""))
  )(match);

  return scripts;
};

export const useSketchCodeManager = () => {
  const { code } = useCurrentSketch();
  const { compileAfterMs } = useSettings();
  const { codeHasSyntaxErrors } = useGlobalCommands();
  const [userCode, setUserCode] = useState(code);
  const [fullCodeToCompile, setFullCodeToCompile] = useState(userCode);
  const [userScripts, setUserScripts] = useState<string[]>([]);

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
    setUserScripts(extractUserScripts(userCode));

    R.pipe(
      R.tap(extractUserScripts),
      replaceLetConstWithVar,
      setFullCodeToCompile
    )(userCode);
  }, [userCode, setFullCodeToCompile, codeHasSyntaxErrors]);

  const html = `

    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}
    ${fullCodeToCompile}


`;

  return { html, userScripts };
};
