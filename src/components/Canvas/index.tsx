import React, { FC } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { useSettings } from "../../hooks/useSettings";

import { CanvasContainer } from "./CanvasContainer";

import { Mappable } from "~/components/Mappable";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: black;
`;

const CanvasOpacity = styled.div<{ $opacity: number }>`
  pointer-events: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0);
`;

const AnimatedOpacity = animated(CanvasOpacity);

export const Canvas: FC = ({ ...rest }) => {
  const {
    canvas: { percentDimmed },
  } = useSettings();

  const canvasOpacityStyles = useSpring({
    opacity: percentDimmed / 100,
  });

  return (
    <StyledCanvas id={"p5-canvas-container"} {...rest}>
      <Mappable id={"map-me2"}>
        <CanvasContainer />
      </Mappable>
      <AnimatedOpacity style={canvasOpacityStyles} />
    </StyledCanvas>
  );
};
