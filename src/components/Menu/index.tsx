import React from "react";
import styled from "styled-components";
import { useSettingsStateContext } from "../../hooks/useSettings";
import { CurrentSketchSettings } from "./components/CurrentSketch";

export interface IMenuProps {}

const StyledMenu = styled.div`
  position: fixed;
  right: 0;
  height: 100vh;
  width: 10rem;
  background-color: black;
  top: 0;
`;

export const Menu: React.FC<IMenuProps> = ({ ...restProps }) => {
  const { showMenu } = useSettingsStateContext();

  if (!showMenu) {
    return null;
  }

  return (
    <StyledMenu {...restProps}>
      <CurrentSketchSettings />
    </StyledMenu>
  );
};
