import React, { useState } from "react";
import styled from "styled-components";
import { P5Canvas } from "./P5Canvas";
import { P5Editor } from "./P5Editor";

export interface ICanvasWrapperProps {}

const defaultSketch = `

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200, 100, 100)
}

function draw() {
  
}

`;

const StyledCanvasWrapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
`;

const StyledEditor = styled(P5Editor)`
  width: 100rem;
  height: 100vh;
`;

export const CanvasWrapper: React.FC<ICanvasWrapperProps> = ({
  ...restProps
}) => {
  const [code, setCode] = useState(defaultSketch);
  return (
    <StyledCanvasWrapper {...restProps}>
      <P5Canvas code={code} />
      <StyledEditor code={code} setCode={setCode} />
    </StyledCanvasWrapper>
  );
};
