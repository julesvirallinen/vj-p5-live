import JSLogger from "js-logger";
import * as R from "ramda";

import { defaultSketchCode } from "../components/Canvas/libs/snippets";
import {
  ICurrentSketch,
  SKETCH_TEMPLATE_ID,
  SKETCH_TEMPLATE_NAME,
} from "../models/sketch";
import { useSettingsDispatchContext } from "../providers/SettingsProvider";
import { useCurrentSketchDispatchContext } from "../providers/SketchProvider";

import { useGlobalCommands } from "./useGlobalCommands";
import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

const Logger = JSLogger.get("canvasLogger");

const getSketchKey = (sketch: Pick<ICurrentSketch, "id">) =>
  `sketch_code_${sketch.id}`;

export const useSketchManager = () => {
  const dispatchSettings = useSettingsDispatchContext();
  const { sketches, loadedSketchId } = useSettings();
  const dispatchSketch = useCurrentSketchDispatchContext();
  const { setItem, getItem } = useLocalStorage();
  const { hardRecompileSketch, setIframeKey } = useGlobalCommands();

  const getNewSketchProps = (name: string) => {
    const userTemplate = fetchSketch({ id: SKETCH_TEMPLATE_ID });

    return {
      code: userTemplate?.code ?? defaultSketchCode,
      id: new Date().getTime().toString(),
      name,
    };
  };

  const createAndLoadSketch = ({
    name,
    id,
    code,
  }: {
    name: string;
    id: string;
    code: string;
  }) => {
    dispatchSettings({
      type: "addSketch",
      payload: { name, id },
    });
    dispatchSketch({ type: "setSketch", payload: { code, id } });
    dispatchSettings({
      type: "setLoadedSketchId",
      payload: { id },
    });
  };

  const newSketch = (name: string) => {
    const newSketch = getNewSketchProps(name);
    createAndLoadSketch(newSketch);

    return newSketch;
  };

  const removeSketch = (id: string) => {
    dispatchSettings({
      type: "patchSettings",
      payload: { sketches: sketches.filter((s) => s.id !== id) },
    });
  };

  const renameSketch = (id: string, name: string) => {
    dispatchSettings({
      type: "patchSettings",
      payload: {
        sketches: sketches.map((s) => (s.id === id ? { ...s, name } : s)),
      },
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
    Logger.info("Loading sketchId: ", sketch.id);
    const loadedSketch = fetchSketch(sketch);

    if (!loadedSketch) {
      Logger.warn("Sketch code missing, removing from list");
      removeSketch(sketch.id);
    }

    if (loadedSketch) {
      Logger.info(`Loaded sketch ${sketch.id}`);
      dispatchSketch({ type: "setSketch", payload: loadedSketch });
      dispatchSettings({
        type: "setLoadedSketchId",
        payload: { id: loadedSketch.id },
      });
      reloadSketch();
    }
  };

  const loadDefaultSketchTemplate = () => {
    const userTemplate = fetchSketch({ id: SKETCH_TEMPLATE_ID });

    if (userTemplate) {
      return loadSketch(userTemplate);
    }

    return createAndLoadSketch({
      code: defaultSketchCode,
      id: SKETCH_TEMPLATE_ID,
      name: SKETCH_TEMPLATE_NAME,
    });
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

    return newSketch("new sketch");
  };

  return {
    newSketch,
    saveSketch,
    loadSketch,
    getInitialSketch,
    reloadSketch,
    renameSketch,
    loadDefaultSketchTemplate,
  };
};
