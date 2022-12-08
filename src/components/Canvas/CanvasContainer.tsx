import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { useSketchCodeManager } from "../../hooks/useSketchCodeManager";

import SketchCanvas from "./SketchCanvas";

export interface ICanvasContainerProps {}

const StyledCanvasContainer = styled.div``;

const StyledLoading = styled.div`
  position: fixed;
  background-color: black;
  width: 100%;
  height: 100%;
`;

export const CanvasContainer: React.FC<ICanvasContainerProps> = ({
  ...restProps
}) => {
  const { userLoadedScripts } = useSettings();
  const { forceLoadCode, ...sketch } = useSketchCodeManager();

  const {
    setRecompileSketch: setGlobalRecompileSketch,
    setHardRecompileSketch,
    setCanvasMediaStream,
    canvasPopupOpen,
  } = useGlobalCommands();

  const [iframeKey, setIframeKey] = useState(new Date().getTime());
  const [sketchLoaded, setSketchLoaded] = useState(false);

  const [recompileSketch, setRecompileSketch] =
    useState<() => void | undefined>();

  const remountCanvas = useCallback(() => {
    const canvasKey = new Date().getTime();
    setIframeKey(canvasKey);
    setSketchLoaded(false);
  }, []);

  const compileSketch = useCallback(() => {
    forceLoadCode();
  }, [forceLoadCode]);

  useEffect(() => {
    setHardRecompileSketch(remountCanvas);
    setGlobalRecompileSketch(compileSketch);
  }, [
    setHardRecompileSketch,
    remountCanvas,
    compileSketch,
    setGlobalRecompileSketch,
    recompileSketch,
  ]);

  return (
    <StyledCanvasContainer {...restProps}>
      <SketchCanvas
        userPersistedScripts={userLoadedScripts}
        sketch={sketch}
        setRecompileSketch={setRecompileSketch}
        setCanvasMediaStream={setCanvasMediaStream}
        key={iframeKey}
        setSketchLoaded={() => setSketchLoaded(true)}
        canvasPopupOpen={canvasPopupOpen}
      />
      {!sketchLoaded && <StyledLoading />}
    </StyledCanvasContainer>
  );
};
