import { useContext, useEffect, useState } from "react";
import CurrentSketchContext, {
  ICurrentSketchContext,
} from "../Providers/currentSketchProvider";
import { useLocalStorage } from "./useLocalStorage";
import * as R from "ramda";

export interface ICurrentSketch {
  code: string;
  id: string;
  name: string;
  shouldRecompileAt?: number;
}

const defaultSketchCode = `

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 100, 100)
}

function draw() {
  
}

`;

const DEFAULT_SKETCH: ICurrentSketch = {
  code: defaultSketchCode,
  id: new Date().toISOString(),
  name: "new",
};

const assocCode = R.assocPath(["code"]);
const assocShouldCompile = R.assocPath(["shouldRecompileAt"]);

export const useCurrentSketchData = () => {
  const context = useContext(CurrentSketchContext);
  const [sketch, setSketch] = useState<ICurrentSketch>(
    context.sketch || DEFAULT_SKETCH
  );

  const setCode = (code: string) => setSketch(assocCode(code, sketch));

  const setShouldRecompileAt: ICurrentSketchContext["setShouldRecompileAt"] = (
    timestamp
  ) => setSketch(assocShouldCompile(timestamp, sketch));

  const code: string = sketch.code;

  const { getItem, setItem } = useLocalStorage();
  useEffect(() => {
    if (!code) {
      const persisted = getItem<string>("sketchCode");
      setCode(persisted || defaultSketchCode);
    } else {
      setItem("sketchCode", code);
    }
  }, [code, setCode]);

  return { code, setCode, sketch, setShouldRecompileAt };
};
