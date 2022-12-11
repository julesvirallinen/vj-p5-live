import { useCallback, useMemo } from 'react';
import Logger from 'js-logger';

import { ISettingsSketch } from '../models/sketch';
import {
  useCurrentSketchDispatchContext,
  useCurrentSketchStateContext,
} from '../providers/SketchProvider';

import { useSettings } from './useSettings';

export const useCurrentSketch = () => {
  const sketch = useCurrentSketchStateContext();
  const { sketches } = useSettings();
  const dispatchCurrentSketch = useCurrentSketchDispatchContext();

  const saveSketch = useCallback(
    (code: string) =>
      dispatchCurrentSketch({ type: 'updateCode', payload: { code } }),
    [dispatchCurrentSketch]
  );

  const currentSketchData = useMemo(() => {
    const sketchData = sketches.find((s) => s.id == sketch.id);

    if (!sketchData) {
      Logger.error('no sketch saved');
    }

    return sketchData;
  }, [sketch.id, sketches]) as ISettingsSketch;

  const updateSketch = useCallback(
    (newCode: string) => {
      saveSketch(newCode);
    },

    [saveSketch]
  );

  return {
    updateSketch,
    ...sketch,
    ...currentSketchData,
  };
};
