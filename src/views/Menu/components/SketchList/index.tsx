import React, { useMemo } from "react";
import { FaRegFileCode } from "react-icons/fa";
import styled from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";
import { SKETCH_TEMPLATE_ID } from "../../../../models/sketch";

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

  const sketchesToShow = useMemo(
    () => sketches.filter((s) => s.id !== SKETCH_TEMPLATE_ID),
    [sketches]
  );

  return (
    <StyledSketchList {...restProps}>
      <h4>Sketches</h4>
      <Sketches>
        {sketchesToShow.map((sketch) => (
          <ListItem key={sketch.id} onClick={() => loadSketch(sketch)}>
            <FaRegFileCode />
            {loadedSketchId === sketch.id ? <b>{sketch.name}</b> : sketch.name}
          </ListItem>
        ))}
      </Sketches>
    </StyledSketchList>
  );
};
