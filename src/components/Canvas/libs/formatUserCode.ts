import * as R from "ramda";

// create 3 capture groups, first is any whitespace, second is let or const and third is a space after.
//Replace only let/const with var and keep whitespace
const replaceLetConstWithVar = (code: string) =>
  code.replace(/^(\s+)?(let|const)( )/gm, "$1var$3");

export const formatUserCode = (code: string, additionalCode: string) => {
  // * Code modifiers. If logic is added that would, say, only update functions that changed, that would be here.
  const formattedCode = R.pipe(replaceLetConstWithVar)(code);

  return `
  ${additionalCode}
  ${formattedCode}`;
};
