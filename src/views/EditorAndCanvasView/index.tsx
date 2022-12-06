import React from "react";
import styled from "styled-components";
import { Canvas } from "../../components/Canvas";
import { P5Editor } from "../../components/P5Editor";

export interface ICanvasWrapperProps {}

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
  height: 100%;
`;

export const EditorAndCanvasView: React.FC<ICanvasWrapperProps> = ({
  ...restProps
}) => {
  return (
    <StyledCanvasWrapper {...restProps}>
      <Canvas />
      <StyledEditor />
    </StyledCanvasWrapper>
  );
};
