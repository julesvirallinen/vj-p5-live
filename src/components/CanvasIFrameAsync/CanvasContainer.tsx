import React, { useMemo } from "react";
import styled from "styled-components";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { useSketchCodeManager } from "../P5Canvas/useSketchCodeManager";
import CanvasWrapper from "./CanvasWrapper";

export interface ICanvasContainerProps {}

const StyledCanvasContainer = styled.div``;

export const CanvasContainer: React.FC<ICanvasContainerProps> = ({
  ...restProps
}) => {
  const { userLoadedScripts } = useSettings();
  const { id, code } = useCurrentSketch();
  const { setRecompileSketch, setHardRecompileSketch, setCanvasMediaStream } =
    useGlobalCommands();

  return (
    <StyledCanvasContainer {...restProps}>
      <CanvasWrapper
        scripts={userLoadedScripts}
        sketch={{ code, id }}
        sketchId={id}
        setRecompileSketch={setRecompileSketch}
        setHardCompileSketch={setHardRecompileSketch}
        setCanvasMediaStream={setCanvasMediaStream}
      />
    </StyledCanvasContainer>
  );
};
