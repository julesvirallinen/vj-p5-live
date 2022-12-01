import React, { FC, useRef } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";
import { VisualsPopup } from "../../views/VisualPopup";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background: black;
`;

const InnerCanvas = styled.div`
  margin: 0;
  background: black;
`;

const CanvasIframe = styled(CanvasFrameForwardRef)`
  position: fixed;
  width: 100vw;
  height: 100vh;
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

const CanvasOpacity = styled.div`
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0);
`;

const AnimatedOpacity = animated(CanvasOpacity);
const AnimatedCanvas = animated(CanvasIframe);

export const P5Canvas: FC = ({ ...rest }) => {
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const doc = canvasRef?.current;
  const { loading } = useScriptLoader(doc);
  const {
    canvas: {
      percentDimmed,
      width,
      height,
      offset: [xValue, yValue],
    },
  } = useSettings();
  const canvasOpacityStyles = useSpring({
    opacity: percentDimmed / 100,
  });
  const canvasSizingStyles = useSpring({
    width: `${width}%`,
    height: `${height}%`,
    top: `${yValue - height / 2}%`,
    left: `${xValue - width / 2}%`,
    config: { velocity: 0.00001 },
  });

  /**
   * x: 50%
   * y: 50%
   *
   * width: 100%
   * height: 100%
   * top 0%
   * left 0%
   *
   * width: 50%
   * height: 50%
   *
   *
   *
   */

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      {canvasRef && <VisualsPopup></VisualsPopup>}
      {loading && <StyledLoading />}
      <AnimatedCanvas ref={canvasRef} style={canvasSizingStyles}>
        <InnerCanvas></InnerCanvas>
        <AnimatedOpacity style={canvasOpacityStyles} />
      </AnimatedCanvas>
    </StyledCanvas>
  );
};
