import React from "react";
import { FaCaretRight } from "react-icons/fa";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { useSettings } from "../../hooks/useSettings";
import { TMenu } from "../../providers/SettingsProvider";

import { CurrentSketchSettings } from "./components/CurrentSketch";
import { MenuSettings } from "./components/MenuSettings";
import { ScriptSettings } from "./components/MenuSettings/views/ScriptSettings";
import { NewSketch } from "./components/NewSketch";
import { SketchList } from "./components/SketchList";
import { PaletteSettings } from "./components/MenuSettings/views/PaletteSettings";

const MENU_WIDTH = 12;

export interface IMenuProps {}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MENU_WIDTH}rem;
  background-color: rgb(0 0 0 / 74%);
  background-opacity: 0.5;

  gap: 2rem;

  padding: 1rem;
`;

const StyledSettingsMenu = styled(StyledMenu)`
  position: relative;
  top: 2rem;
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
  right: ${MENU_WIDTH + 1}rem;
`;

const AnimatedMenu = animated(StyledMenuContainer);
const AnimatedCaret = animated(StyledMenuCaret);

const getCaretRotation = (isMenuOpen: boolean, isCurrentMenu: boolean) => {
  if (isMenuOpen && isCurrentMenu) {
    return "rotate(0deg)";
  } else return "rotate(180deg)";
};

export const Menu: React.FC<IMenuProps> = () => {
  const { showMenu, openMenu, setOpenMenu, setShowMenu } = useSettings();

  const styles = useSpring({
    transform: showMenu
      ? "translate(0rem, 0)"
      : `translate(${MENU_WIDTH}rem,0)`,
  });

  const caretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "sketches"),
  });

  const settingsCaretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "settings"),
    opacity: showMenu ? 1 : 0,
    top: showMenu ? "5rem" : "0rem",
  });

  const scriptsCaretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "scripts"),
    opacity: showMenu ? 1 : 0,
    top: showMenu ? "8rem" : "0rem",
  });
  // I know I promise I'll refactor this soon ;__;
  const paletteCaretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "palette"),
    opacity: showMenu ? 1 : 0,
    top: showMenu ? "10.5rem" : "0rem",
  });

  const handleCaret = (menu: TMenu) => {
    if (!showMenu) {
      setShowMenu(true);
    }

    if (showMenu && menu === openMenu) {
      return setShowMenu(false);
    }

    if (showMenu && menu !== openMenu) {
      return setOpenMenu(menu);
    }
  };

  return (
    <>
      <AnimatedMenu style={styles}>
        <AnimatedCaret
          style={caretStyles}
          onClick={() => handleCaret("sketches")}
        >
          <FaCaretRight size={30} />
        </AnimatedCaret>
        {/* TODO: generalize these... */}
        <AnimatedCaret
          style={settingsCaretStyles}
          onClick={() => handleCaret("settings")}
        >
          <FaCaretRight size={30} />
        </AnimatedCaret>
        <AnimatedCaret
          style={scriptsCaretStyles}
          onClick={() => handleCaret("scripts")}
        >
          <FaCaretRight size={30} />
        </AnimatedCaret>
        <AnimatedCaret
          style={paletteCaretStyles}
          onClick={() => handleCaret("palette")}
        >
          <FaCaretRight size={30} />
        </AnimatedCaret>
        {openMenu === "sketches" && (
          <StyledMenu>
            <CurrentSketchSettings />
            <SketchList />
            <NewSketch />
          </StyledMenu>
        )}
        {openMenu === "settings" && (
          <StyledSettingsMenu>
            <MenuSettings />
          </StyledSettingsMenu>
        )}
        {openMenu === "scripts" && (
          <StyledSettingsMenu>
            <ScriptSettings />
          </StyledSettingsMenu>
        )}
        {openMenu === "palette" && (
          <StyledSettingsMenu>
            <PaletteSettings />
          </StyledSettingsMenu>
        )}
      </AnimatedMenu>
    </>
  );
};
