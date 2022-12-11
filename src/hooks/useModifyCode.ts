import * as R from 'ramda';

/**
 * Used to set parts in user code automatically, default things in draw and setup, not sure if this is good yet
 *
 * Kinda bad, maybe necessary
 */

export const useModifyCode = (code: string) => {
  const codeLines = code.split('\n');

  const modifiedLines = R.pipe(R.flatten)(codeLines);

  return modifiedLines.join('\n');
};
