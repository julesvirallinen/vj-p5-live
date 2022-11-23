import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { CanvasFrameForwardRef } from "./components/CanvasIframe";
import { useScriptLoader } from "./useScriptLoader";
import { useSketchManager } from "../../hooks/useSketchManager";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  border: 0;
  color: black;
  background-color: black;
  color-scheme: none;
`;

const CanvasIframe = styled(CanvasFrameForwardRef)`
  width: 100%;
  height: 100%;
  border: 0;
  color: black;
  background-color: black;
  color-scheme: none;
`;

export const P5Canvas: FC = ({ ...rest }) => {
  const canvasRef = useRef<HTMLIFrameElement | null>(null);
  const { getInitialSketch, loadSketch } = useSketchManager();
  const doc = canvasRef?.current;
  useScriptLoader(doc);

  return (
    <StyledCanvas id={"p5canvas-container"} {...rest}>
      <CanvasIframe ref={canvasRef}></CanvasIframe>
    </StyledCanvas>
  );
};
