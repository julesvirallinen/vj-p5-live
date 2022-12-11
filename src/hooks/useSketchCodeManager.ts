import { useCallback, useEffect, useMemo, useState } from 'react';
import Logger from 'js-logger';
import { debounce } from 'lodash';

import { createPaletteSnippet } from '../data/palette/createPaletteSnippet';
import * as SNIPPETS from '../data/snippets';

import { useCurrentSketch } from './useCurrentSketch';
import { useGlobalCommands } from './useGlobalCommands';
import { useSettings } from './useSettings';

const getDefaultSnippets = () => `
  ${SNIPPETS.windowResizer}
  ${SNIPPETS.customEase}
  ${SNIPPETS.processingLoggingCompatability}`;

export const useSketchCodeManager = () => {
  const { code, id, paletteName } = useCurrentSketch();
  const { compileAfterMs, colorPalettes } = useSettings();
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
      Logger.info('Not updating code, code has syntax errors');
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
    Logger.info('Forced code reload, cancel debounce');
    setUserCode(code);
    setCurrentId(id);
    memoedDebounce.cancel();
  }, [code, id, memoedDebounce]);

  const additionalCode = `
  ${paletteName ? createPaletteSnippet(colorPalettes, paletteName) : ''}
  ${getDefaultSnippets()}


  `;

  return {
    sketch: { paletteName, code: userCode, id, additionalCode },
    persistedCode: code,
    forceLoadCode,
  };
};
