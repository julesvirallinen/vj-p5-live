import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import * as SNIPPETS from "./snippets";
import * as R from "ramda";
import { useMemo } from "react";

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

export const useSketchCodeManager = () => {
  const { codeToCompile } = useCurrentSketch();

  const modifiedCode = useMemo(
    () => R.pipe(replaceLetConstWithVar)(codeToCompile),
    [codeToCompile]
  );

  const html = `


    ${SNIPPETS.windowResizer}
    ${SNIPPETS.customEase}
    ${SNIPPETS.processingLoggingCompatability}
    ${modifiedCode}
    

`;

  return html;
};
