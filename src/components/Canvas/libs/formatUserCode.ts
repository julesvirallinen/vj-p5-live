import * as R from "ramda";

import * as SNIPPETS from "./snippets";

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

const getDefaultSnippets = () => `${SNIPPETS.windowResizer}
  ${SNIPPETS.customEase}
  ${SNIPPETS.processingLoggingCompatability}`;

export const formatUserCode = (code: string) => {
  const formattedCode = R.pipe(replaceLetConstWithVar)(code);

  const sketchScripts = `
${getDefaultSnippets()}
${formattedCode}

`;

  return sketchScripts;
};
