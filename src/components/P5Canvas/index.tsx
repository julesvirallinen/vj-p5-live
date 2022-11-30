import React, { FC, useRef } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";
import { VisualsPopup } from "../../views/VisualPopup";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
`;

const CanvasIframe = styled(CanvasFrameForwardRef)`
  width: 100%;
  height: 100%;
  border: 0;
  color: black;
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
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const doc = canvasRef?.current;
  const { loading } = useScriptLoader(doc);
  const {
    canvas: { percentDimmed },
  } = useSettings();
  const settingsCaretStyles = useSpring({
    opacity: percentDimmed / 100,
  });

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      {canvasRef && <VisualsPopup></VisualsPopup>}
      <AnimatedOpacity style={settingsCaretStyles} />
      {loading && <StyledLoading />}
      <CanvasIframe ref={canvasRef}></CanvasIframe>
    </StyledCanvas>
  );
};
