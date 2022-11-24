import React, { createContext, FC, useContext, useReducer } from "react";
import * as R from "ramda";
import { Path } from "ramda";
import { useSketchManager } from "../../hooks/useSketchManager";
import { ICurrentSketch } from "../../models/sketch";

export type IAction =
  | {
      type: "updateCode";
      payload: { code: string };
    }
  | {
      type: "setSketch";
      payload: ICurrentSketch;
    };

export const defaultSketchCode = `

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 100, 100)
}

function draw() {
  
}

`;

export const defaultSketch: ICurrentSketch = {
  name: "new",
  code: defaultSketchCode,
  id: "defaultNew",
};

// context for using state
const CurrentSketchStateContext = createContext<ICurrentSketch>(
  {} as ICurrentSketch
);

// context for updating state
const CurrentSketchDispatchContext = createContext<React.Dispatch<IAction>>(
  () => ({})
);

const reducer = (
  currentSketch: ICurrentSketch,
  action: IAction
): ICurrentSketch => {
  const assoc = <T,>(path: Path, value: T): ICurrentSketch =>
    R.assocPath<T, ICurrentSketch>(path, value)(currentSketch);

  switch (action.type) {
    case "updateCode":
      return assoc(["code"], action.payload.code);
    case "setSketch":
      return action.payload;
    default:
      throw new Error(`action type not implemented`);
  }
};

export const CurrentSketchProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { saveSketch, getInitialSketch } = useSketchManager();
  const [state, dispatch] = useReducer(
    R.pipe(reducer, R.tap(saveSketch)),
    defaultSketch,
    (initialSketch) => {
      return getInitialSketch() ?? initialSketch;
    }
  );

  return (
    <CurrentSketchDispatchContext.Provider value={dispatch}>
      <CurrentSketchStateContext.Provider value={state}>
        {children}
      </CurrentSketchStateContext.Provider>
    </CurrentSketchDispatchContext.Provider>
  );
};

// use them context we've created
export const useCurrentSketchStateContext = () =>
  useContext(CurrentSketchStateContext);
export const useCurrentSketchDispatchContext = () =>
  useContext(CurrentSketchDispatchContext);
