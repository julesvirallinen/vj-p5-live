import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../Providers/SettingsProvider";
import {
  defaultSketchCode,
  ICurrentSketch,
  useCurrentSketchDispatchContext,
} from "../Providers/SketchProvider";
import { useLocalStorage } from "./useLocalStorage";
import * as R from "ramda";
const getNewSketchProps = (name: string) => {
  return {
    code: defaultSketchCode,
    id: new Date().getTime().toString(),
    name,
  };
};

const getSketchKey = (sketch: Pick<ICurrentSketch, "id" | "name">) =>
  `sketch_code_${sketch.name}_${sketch.id}`;

export const useSketchManager = () => {
  const dispatchSettings = useSettingsDispatchContext();
  const { sketches } = useSettingsStateContext();
  const dispatchSketch = useCurrentSketchDispatchContext();
  const { setItem, getItem } = useLocalStorage();

  const newSketch = (name: string) => {
    const newSketch = getNewSketchProps(name);
    dispatchSettings({
      type: "addSketch",
      payload: { name: newSketch.name, id: newSketch.id },
    });
    dispatchSketch({ type: "setSketch", payload: newSketch });
  };

  const saveSketch = (sketch: ICurrentSketch) =>
    setItem(getSketchKey(sketch), sketch);

  const fetchSketch = (sketch: Pick<ICurrentSketch, "id" | "name">) =>
    getItem<ICurrentSketch>(getSketchKey(sketch));

  const loadSketch = (sketch: Pick<ICurrentSketch, "id" | "name">) => {
    const loadedSketch = fetchSketch(sketch);

    if (loadedSketch) {
      dispatchSketch({ type: "setSketch", payload: loadedSketch });
    }
  };

  const getFirstSketch = () => {
    const first = sketches[0];
    if (R.isNil(first)) {
      const sketch = fetchSketch(first);
      if (sketch) {
        return sketch;
      }
    }
  };

  return { newSketch, saveSketch, loadSketch, getFirstSketch };
};
