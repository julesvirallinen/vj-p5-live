import * as R from 'ramda';

import { ALWAYS_LOADED_SCRIPTS } from '../../../defs/alwaysLoadedScripts';
import { TSrcScript } from '../../../models/script';

// matches const loadScripts = [ANYTHING HERE]
// P5LIVE syntax for compatability
const matchScripts = /^[\w]?(let |const |var )libs = \[(?<scriptTags>.*)(\])/gm;

export const extractUserScripts = (code: string) => {
  const match = matchScripts.exec(code);

  const scripts = R.pipe(
    // get script group or empty string
    R.pathOr<string>('', ['groups', 'scriptTags']),
    // split scripts with comma
    R.split(','),
    // remove quotes from each url
    R.map(R.replace(/['"]+/g, ''))
  )(match);

  if (scripts.length === 1 && scripts[0] == '') return [];

  return scripts;
};

export const compileScriptList = (
  code: string,
  userPersistedScripts: TSrcScript[]
) => {
  const sketchScripts = extractUserScripts(code);

  return [
    ...ALWAYS_LOADED_SCRIPTS,
    ...userPersistedScripts,
    ...sketchScripts.map((s) => ({ id: s, path: s })),
  ];
};
