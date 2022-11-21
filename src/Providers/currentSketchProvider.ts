import React, { useContext } from "react";
import { ICurrentSketch } from "../hooks/useCurrentSketchData";

// temporary no-operation function to init
const NOOP = () => {};

export interface ICurrentSketchContext {
  sketch: ICurrentSketch | null;
  setCode: (code: string) => void;
  code: string;
  shouldRecompileAt?: number;
  setShouldRecompileAt: (time: number | undefined) => void;
}

const CurrentSketchContext = React.createContext<ICurrentSketchContext>({
  sketch: null,
  setCode: NOOP,
  code: "",
  shouldRecompileAt: undefined,
  setShouldRecompileAt: NOOP,
});
export const CurrentSketchContextProvider = CurrentSketchContext.Provider;
export default CurrentSketchContext;

export const useCurrentSketchContext = () => useContext(CurrentSketchContext);
