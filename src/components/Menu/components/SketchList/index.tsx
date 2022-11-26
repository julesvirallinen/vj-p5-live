import React from "react";
import { FaRegFileCode } from "react-icons/fa";
import styled from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";

export interface ISketchListProps {}

const StyledSketchList = styled.div`
  list-style: none;
`;

const Sketches = styled.div`
  max-height: 10rem;
  overflow: scroll;
`;

const ListItem = styled.div`
  color: #ccc1c1;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  > svg > * {
    color: #ccc1c1;
  }
`;

export const SketchList: React.FC<ISketchListProps> = ({ ...restProps }) => {
  const { sketches, loadedSketchId } = useSettings();
  const { loadSketch } = useSketchManager();

  return (
    <StyledSketchList {...restProps}>
      <h4>Sketches</h4>
      <Sketches>
        {sketches.map((sketch) => (
          <ListItem key={sketch.id} onClick={() => loadSketch(sketch)}>
            <FaRegFileCode />
            {loadedSketchId === sketch.id ? <b>{sketch.name}</b> : sketch.name}
          </ListItem>
        ))}
      </Sketches>
    </StyledSketchList>
  );
};
