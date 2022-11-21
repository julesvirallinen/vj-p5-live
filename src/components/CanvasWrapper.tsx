import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CurrentSketchContext, {
  useCurrentSketchContext,
} from "../Providers/currentSketchProvider";
import { P5Canvas } from "./P5Canvas";
import { P5Editor } from "./P5Editor";

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

export const CanvasWrapper: React.FC<ICanvasWrapperProps> = ({
  ...restProps
}) => {
  return (
    <StyledCanvasWrapper {...restProps}>
      <P5Canvas />
      <StyledEditor />
    </StyledCanvasWrapper>
  );
};
