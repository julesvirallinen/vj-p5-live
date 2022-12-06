import React, { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";
import { VisualsPopup } from "../../views/VisualPopup";
import { Maptastic } from "maptastic";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: black;
`;

const CanvasIframe = styled(CanvasFrameForwardRef)`
  width: 100vw;
  height: 100vh;
  border: 0;
  background-color: black;
  color-scheme: none;
`;

const StyledLoading = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
`;

const CanvasOpacity = styled.div<{ $opacity: number }>`
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0);
`;

const CanvasMapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
`;

const AnimatedOpacity = animated(CanvasOpacity);

export const P5Canvas: FC = ({ ...rest }) => {
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const [map, setMap] = useState<any>();
  const doc = canvasRef?.current;
  const { loading } = useScriptLoader(doc);
  const { maptasticEnabled } = useSettings();
  const {
    canvas: { percentDimmed },
  } = useSettings();
  const settingsCaretStyles = useSpring({
    opacity: percentDimmed / 100,
  });
  const { setIframeRef } = useGlobalCommands();

  useEffect(() => {
    if (canvasRef?.current?.contentWindow) {
      setIframeRef(canvasRef);
      maptasticEnabled && setMap(new Maptastic("map-me"));
    }
  }, [canvasRef?.current?.contentWindow, maptasticEnabled, setIframeRef]);

  return (
    <StyledCanvas id={"p5-canvas-container"} {...rest}>
      {canvasRef && <VisualsPopup></VisualsPopup>}
      <AnimatedOpacity style={settingsCaretStyles} />
      {loading && <StyledLoading />}
      <CanvasMapContainer id={"map-me"}>
        <CanvasIframe ref={canvasRef}></CanvasIframe>
      </CanvasMapContainer>
    </StyledCanvas>
  );
};
