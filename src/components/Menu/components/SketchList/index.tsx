import React from "react";
import styled from "styled-components";
import { useSketchManager } from "../../../../hooks/useSketchManager";
import { useSettingsStateContext } from "../../../../Providers/SettingsProvider";

export interface ISketchListProps {}

const StyledSketchList = styled.div``;

export const SketchList: React.FC<ISketchListProps> = ({ ...restProps }) => {
  const { sketches } = useSettingsStateContext();
  const { loadSketch } = useSketchManager();

  return (
    <StyledSketchList {...restProps}>
      <h4>Sketches</h4>
      {sketches.map((sketch) => (
        <li key={sketch.id} onClick={() => loadSketch(sketch)}>
          {sketch.name}
        </li>
      ))}
    </StyledSketchList>
  );
};
