import React from "react";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import { CurrentSketchSettings } from "./components/CurrentSketch";
import { NewSketch } from "./components/NewSketch";
import { SketchList } from "./components/SketchList";

export interface IMenuProps {}

const StyledMenu = styled.div`
  position: fixed;
  right: 0;
  height: 100vh;
  width: 10rem;
  background-color: #000;
  top: 0;
`;

export const Menu: React.FC<IMenuProps> = ({ ...restProps }) => {
  const { showMenu } = useSettings();

  if (!showMenu) {
    return null;
  }

  return (
    <StyledMenu {...restProps}>
      <CurrentSketchSettings />
      <NewSketch />
      <SketchList />
    </StyledMenu>
  );
};
