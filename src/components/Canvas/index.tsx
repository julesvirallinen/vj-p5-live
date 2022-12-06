import React, { FC, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import Logger from "js-logger";

import { Maptastic } from "maptastic";
import { CanvasContainer } from "./CanvasContainer";

const StyledCanvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: black;
  pointer-events: none;
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

export const Canvas: FC = ({ ...rest }) => {
  const [map, setMap] = useState<any>();
  const mapRef = useRef<HTMLDivElement>(null);
  const { maptasticEnabled } = useSettings();
  const {
    canvas: { percentDimmed },
  } = useSettings();
  const canvasOpacityStyles = useSpring({
    opacity: percentDimmed / 100,
  });

  useEffect(() => {
    if (maptasticEnabled && mapRef.current) {
      Logger.info("maptastic initialized");
      setMap(new Maptastic("map-me"));
    }
  }, [maptasticEnabled]);

  return (
    <StyledCanvas id={"p5-canvas-container"} {...rest}>
      <CanvasMapContainer id={"map-me"} ref={mapRef}>
        <CanvasContainer />
      </CanvasMapContainer>
      <AnimatedOpacity style={canvasOpacityStyles} />
    </StyledCanvas>
  );
};
