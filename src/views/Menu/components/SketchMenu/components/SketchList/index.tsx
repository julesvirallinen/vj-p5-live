import React, { useMemo } from 'react';
import { FaRegFileCode } from 'react-icons/fa';
import styled, { css } from 'styled-components';

import { LabelText } from '../../../../../../components/ui/Label';
import { useSettings } from '../../../../../../hooks/useSettings';
import { useSketchManager } from '../../../../../../hooks/useSketchManager';
import { SKETCH_TEMPLATE_ID } from '../../../../../../models/sketch';

export interface ISketchListProps {}

const StyledSketchList = styled.div`
  list-style: none;
`;

const Sketches = styled.div`
  max-height: 10rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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

const SketchName = styled(LabelText)<{ $isSelected: boolean }>`
  text-weight: 100;

  ${(props) =>
    props.$isSelected &&
    css`
      color: ${(props) => props.theme.colors.secondary} !important;
    `}
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
            <SketchName $isSelected={loadedSketchId === sketch.id}>
              {sketch.name}
            </SketchName>
          </ListItem>
        ))}
      </Sketches>
    </StyledSketchList>
  );
};
