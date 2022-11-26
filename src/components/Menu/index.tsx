import React from "react";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import { CurrentSketchSettings } from "./components/CurrentSketch";
import { NewSketch } from "./components/NewSketch";
import { SketchList } from "./components/SketchList";
import { useSpring, animated } from "react-spring";

export interface IMenuProps {}

const StyledMenu = styled.div`
  width: 10rem;
  background-color: #000;
  height: 100%;
`;

const StyledMenuContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
`;

const StyledMenuCaret = styled.div`
  position: fixed;
  top: 2rem;
  right: 11rem;
`;

const AnimatedMenu = animated(StyledMenuContainer);
const AnimatedCaret = animated(StyledMenuCaret);

export const Menu: React.FC<IMenuProps> = ({ ...restProps }) => {
  const { showMenu, toggleShowMenu } = useSettings();
  const styles = useSpring({
    transform: showMenu ? "translate(0rem, 0)" : `translate(10rem,0)`,
  });
  const caretStyles = useSpring({
    transform: showMenu ? "rotate(0deg)" : `rotate(180deg)`,
  });

  return (
    <AnimatedMenu style={styles}>
      <AnimatedCaret style={caretStyles} onClick={toggleShowMenu}>
        {">>"}
      </AnimatedCaret>
      <StyledMenu {...restProps}>
        <CurrentSketchSettings />
        <NewSketch />
        <SketchList />
      </StyledMenu>
    </AnimatedMenu>
  );
};
