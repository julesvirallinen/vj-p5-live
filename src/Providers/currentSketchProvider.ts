import React, { useContext } from "react";
import { ICurrentSketch } from "../hooks/useCurrentSketchData";

const NOOP = () => {};

interface ICurrentSketchContext {
  sketch: ICurrentSketch | null;
  setCode: (code: string) => void;
  code: string;
}

const CurrentSketchContext = React.createContext<ICurrentSketchContext>({
  sketch: null,
  setCode: NOOP,
  code: "",
});
export const Provider = CurrentSketchContext.Provider;
export default CurrentSketchContext;

export const useCurrentSketchContext = () => useContext(CurrentSketchContext);
