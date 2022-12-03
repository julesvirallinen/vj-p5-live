import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "./snippets";
import * as R from "ramda";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSettings } from "../../hooks/useSettings";

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

export const useSketchCodeManager = () => {
  const { code } = useCurrentSketch();
  const { compileAfterMs } = useSettings();
  const [codeToCompile, setCodeToCompile] = useState(code);

  const memoedDebounce = useMemo(
    () => debounce((code: string) => setCodeToCompile(code), compileAfterMs),
    [compileAfterMs]
  );

  useEffect(() => {
    memoedDebounce(code);
  }, [memoedDebounce, code]);

  const modifiedCode = useMemo(
    () => R.pipe(replaceLetConstWithVar)(codeToCompile),
    [codeToCompile]
  );

  const html = `
    var console = {
			log: function(m){
				
        console.log(m, 'background: #222; color: #bada55');

			},
      error: function(m){
				
        console.log(m, 'background: #222; color: #bada55');

			}
		};

    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}
  try{
    ${modifiedCode}

  } catch(e) {
    console.log(e.message, 'background: #222; color: #bada55');

  }   

`;

  return html;
};
