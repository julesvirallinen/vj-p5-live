import React from "react";
import styled from "styled-components";

import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { useSketchCodeManager } from "../../hooks/useSketchCodeManager";

import SketchCanvas, { ISketchCanvasProps } from "./SketchCanvas";

import { useRecompileCanvas } from "~/components/Canvas/useRecompileCanvas";

export interface ICanvasContainerProps {}

const StyledCanvasContainer = styled.div``;

const StyledLoading = styled.div`
  position: fixed;
  background-color: black;
  width: 100%;
  height: 100%;
`;

// Small hook to handle passing props forward to canvas from providers
const useGetSketchCanvasProps = (props: {
  setRecompileSketch: ISketchCanvasProps["globalSetters"]["setRecompileSketch"];
}) => {
  const { sketch } = useSketchCodeManager();

  const { userLoadedScripts } = useSettings();

  const { setCanvasMediaStream, canvasPopupOpen, setIframeRef } =
    useGlobalCommands();

  return {
    sketch,
    userPersistedScripts: userLoadedScripts,
    canvasPopupOpen,
    globalSetters: {
      setIframeRef,
      setRecompileSketch: props.setRecompileSketch,
      setCanvasMediaStream,
    },
  };
};

export const CanvasContainer: React.FC<ICanvasContainerProps> = ({
  ...restProps
}) => {
  const { iframeKey, setRecompileSketch, setSketchLoaded, sketchLoaded } =
    useRecompileCanvas();

  const sketchCanvasProps = useGetSketchCanvasProps({ setRecompileSketch });

  return (
    <StyledCanvasContainer {...restProps}>
      <SketchCanvas
        {...sketchCanvasProps}
        key={iframeKey}
        setSketchLoaded={() => setSketchLoaded(true)}
      />
      {!sketchLoaded && <StyledLoading />}
    </StyledCanvasContainer>
  );
};
