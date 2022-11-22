import React, { createContext, FC, useContext, useReducer } from "react";
import * as R from "ramda";
import { Path } from "ramda";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export interface ICurrentSketch {
  code: string;
  id: string;
  name: string;
}

export type IAction = {
  type: "updateCode";
  payload: { code: string };
};

const defaultSketchCode = `

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 100, 100)
}

function draw() {
  
}

`;

const initialState: ICurrentSketch = {
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
  () => {}
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
    default:
      throw new Error();
  }
};

export const CurrentSketchProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const local = useLocalStorage();
  const [state, dispatch] = useReducer(reducer, initialState);

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
