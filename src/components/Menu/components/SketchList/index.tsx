import React from "react";
import styled from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";

export interface ISketchListProps {}

const StyledSketchList = styled.div``;

export const SketchList: React.FC<ISketchListProps> = ({ ...restProps }) => {
  const { sketches, loadedSketchId } = useSettings();
  const { loadSketch } = useSketchManager();

  return (
    <StyledSketchList {...restProps}>
      <h4>Sketches</h4>
      {sketches.map((sketch) => (
        <li key={sketch.id} onClick={() => loadSketch(sketch)}>
          {loadedSketchId === sketch.id ? <b>{sketch.name}</b> : sketch.name}
        </li>
      ))}
    </StyledSketchList>
  );
};
