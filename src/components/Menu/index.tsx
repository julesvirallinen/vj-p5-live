import React from "react";
import styled from "styled-components";

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
  return <StyledMenu {...restProps}>heloo</StyledMenu>;
};
