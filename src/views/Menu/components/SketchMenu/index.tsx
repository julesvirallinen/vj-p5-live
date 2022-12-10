import React from "react";
import styled from "styled-components";

import { AppHeader } from "~/views/Menu/components/AppHeader";
import { CurrentSketchSettings } from "~/views/Menu/components/SketchMenu/components/CurrentSketch";
import { NewSketch } from "~/views/Menu/components/SketchMenu/components/NewSketch";
import { SketchList } from "~/views/Menu/components/SketchMenu/components/SketchList";

export interface ISketchMenuProps {}

const StyledSketchMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SketchMenu: React.FC<ISketchMenuProps> = ({ ...restProps }) => {
  return (
    <StyledSketchMenu {...restProps}>
      <AppHeader />
      <CurrentSketchSettings />
      <SketchList />
      <NewSketch />
    </StyledSketchMenu>
  );
};
