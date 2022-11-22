import { useSettingsDispatchContext } from "../Providers/SettingsProvider";
import {
  useCurrentSketchDispatchContext,
  useCurrentSketchStateContext,
} from "../Providers/SketchProvider";

export const useCurrentSketch = () => {
  const sketch = useCurrentSketchStateContext();
  const dispatchCurrentSketch = useCurrentSketchDispatchContext();

  const updateSketch = (newCode: string) =>
    dispatchCurrentSketch({ type: "updateCode", payload: { code: newCode } });

  return { updateSketch, ...sketch };
};
