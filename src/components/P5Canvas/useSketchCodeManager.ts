import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "../CanvasIFrameAsync/libs/snippets";
import * as R from "ramda";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSettings } from "../../hooks/useSettings";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";

// sorry for the regex :(

// matches const loadScripts = [ANYTHING HERE]
// P5LIVE syntax for compatability
const matchScripts = /^[\w]?(let |const |var )libs = \[(?<scriptTags>.*)(\])/gm;

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

  if (scripts.length === 1 && scripts[0] == "") return [];

  return scripts;
};

export const useSketchCodeManager = () => {
  const { code } = useCurrentSketch();
  const { compileAfterMs } = useSettings();
  const { codeHasSyntaxErrors } = useGlobalCommands();
  const [userCode, setUserCode] = useState(code);
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

  return { userScripts };
};
