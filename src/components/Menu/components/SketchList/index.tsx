import React from "react";
import { FaRegFileCode } from "react-icons/fa";
import styled from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";

export interface ISketchListProps {}

const StyledSketchList = styled.div`
  list-style: none;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SketchList: React.FC<ISketchListProps> = ({ ...restProps }) => {
  const { sketches, loadedSketchId } = useSettings();
  const { loadSketch } = useSketchManager();

  return (
    <StyledSketchList {...restProps}>
      <h4>Sketches</h4>
      {sketches.map((sketch) => (
        <ListItem key={sketch.id} onClick={() => loadSketch(sketch)}>
          <FaRegFileCode
            color={loadedSketchId == sketch.id ? "red" : "inherit"}
          />
          {loadedSketchId === sketch.id ? <b>{sketch.name}</b> : sketch.name}
        </ListItem>
      ))}
    </StyledSketchList>
  );
};
