import { useSettingsDispatchContext } from "../Providers/SettingsProvider";
import {
  defaultSketchCode,
  useCurrentSketchDispatchContext,
} from "../Providers/SketchProvider";
import { useLocalStorage } from "./useLocalStorage";
import * as R from "ramda";
import { useSettings } from "./useSettings";
import { useGlobalCommands } from "./useGlobalCommands";
import { ICurrentSketch } from "../models/sketch";

const getNewSketchProps = (name: string) => {
  return {
    code: defaultSketchCode,
    id: new Date().getTime().toString(),
    name,
  };
};

const getSketchKey = (sketch: Pick<ICurrentSketch, "id">) =>
  `sketch_code_${sketch.id}`;

export const useSketchManager = () => {
  const dispatchSettings = useSettingsDispatchContext();
  const { sketches, loadedSketchId } = useSettings();
  const dispatchSketch = useCurrentSketchDispatchContext();
  const { setItem, getItem } = useLocalStorage();
  const { hardRecompileSketch, setIframeKey } = useGlobalCommands();

  const newSketch = (name: string) => {
    const newSketch = getNewSketchProps(name);
    dispatchSettings({
      type: "addSketch",
      payload: { name: newSketch.name, id: newSketch.id },
    });
    dispatchSketch({ type: "setSketch", payload: newSketch });
  };

  const removeSketch = (id: string) => {
    dispatchSettings({
      type: "patchSettings",
      payload: { sketches: sketches.filter((s) => s.id !== id) },
    });
  };

  const saveSketch = (sketch: ICurrentSketch) =>
    setItem(getSketchKey(sketch), sketch);

  const fetchSketch = (sketch: Pick<ICurrentSketch, "id">) =>
    getItem<ICurrentSketch>(getSketchKey(sketch));

  const reloadSketch = () => {
    // TODO: figure out how to remove, this prevents a race condition in sketch changing
    setTimeout(() => {
      setIframeKey(new Date().toString());
      hardRecompileSketch();
    }, 400);
  };

  const loadSketch = (sketch: Pick<ICurrentSketch, "id">) => {
    const loadedSketch = fetchSketch(sketch);

    if (!loadedSketch) {
      removeSketch(sketch.id);
    }

    if (loadedSketch) {
      dispatchSketch({ type: "setSketch", payload: loadedSketch });
      dispatchSettings({
        type: "setLoadedSketchId",
        payload: { id: loadedSketch.id },
      });
      reloadSketch();
    }
  };

  const getInitialSketch = () => {
    const loadedSketch = sketches.find(
      (sketch) => sketch.id === loadedSketchId
    );
    const sketchToLoad = loadedSketch ?? sketches[0];
    if (!R.isNil(sketchToLoad)) {
      const sketch = fetchSketch(sketchToLoad);
      if (sketch) {
        return sketch;
      }
    }
  };

  return { newSketch, saveSketch, loadSketch, getInitialSketch, reloadSketch };
};
