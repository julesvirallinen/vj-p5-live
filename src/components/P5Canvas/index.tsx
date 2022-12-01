import React, { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";
import { VisualsPopup } from "../../views/VisualPopup";
import { Maptastic } from "maptastic";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: black;
`;

const InnerCanvas = styled.div`
  margin: 0;
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

const AnimatedOpacity = animated(CanvasOpacity);

export const P5Canvas: FC = ({ ...rest }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const [map, setMap] = useState<any>();
  const doc = canvasRef?.current;
  const { loading } = useScriptLoader(doc);
  const {
    canvas: { percentDimmed },
  } = useSettings();
  const settingsCaretStyles = useSpring({
    opacity: percentDimmed / 100,
  });

  useEffect(() => {
    if (canvasRef) {
      setMap(new Maptastic("map-me"));
    }
  }, [canvasRef]);

  return (
    <StyledCanvas id={"p5-canvas-container"} {...rest}>
      {canvasRef && <VisualsPopup></VisualsPopup>}
      <AnimatedOpacity style={settingsCaretStyles} />
      {loading && <StyledLoading />}
      <div id={"map-me"} ref={canvasContainerRef}>
        <CanvasIframe ref={canvasRef}>
          <InnerCanvas></InnerCanvas>
        </CanvasIframe>
      </div>
    </StyledCanvas>
  );
};
