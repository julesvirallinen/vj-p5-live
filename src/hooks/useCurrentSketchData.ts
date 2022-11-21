import { useContext, useEffect, useState } from "react";
import CurrentSketchContext from "../Providers/currentSketchProvider";
import { useLocalStorage } from "./useLocalStorage";
import * as R from "ramda";

export interface ICurrentSketch {
  code: string;
  id: string;
  name: string;
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

export const useCurrentSketchData = () => {
  const context = useContext(CurrentSketchContext);
  const [sketch, setSketch] = useState<ICurrentSketch | null>(context.sketch);

  const setCode = (code: string) =>
    R.pipe(R.assocPath(["code"], code), setSketch)(sketch);
  const code = R.prop("code")(sketch);

  const { getItem, setItem } = useLocalStorage();
  useEffect(() => {
    if (!code) {
      const persisted = getItem<string>("sketchCode");
      setCode(persisted || defaultSketchCode);
    } else {
      setItem("sketchCode", code);
    }
  }, [code, setCode]);

  return { code, setCode, sketch };
};
