import React from "react";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";
import { CurrentSketchSettings } from "./components/CurrentSketch";
import { NewSketch } from "./components/NewSketch";
import { SketchList } from "./components/SketchList";
import { useSpring, animated } from "react-spring";
import { FaCaretRight } from "react-icons/fa";
import { TMenu } from "../../Providers/SettingsProvider";
import { MenuSettings } from "./components/MenuSettings";

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
const StyledSettingsCaret = styled.div`
  position: fixed;
  top: 5rem;
  right: ${MENU_WIDTH + 1}rem;
`;

const AnimatedMenu = animated(StyledMenuContainer);
const AnimatedCaret = animated(StyledMenuCaret);
const SettingsCaret = animated(StyledSettingsCaret);

const getCaretRotation = (isMenuOpen: boolean, isCurrentMenu: boolean) => {
  if (isMenuOpen && isCurrentMenu) {
    return "rotate(0deg)";
  } else return "rotate(180deg)";
};

export const Menu: React.FC<IMenuProps> = () => {
  const { showMenu, toggleShowMenu, openMenu, setOpenMenu, setShowMenu } =
    useSettings();
  const styles = useSpring({
    transform: showMenu
      ? "translate(0rem, 0)"
      : `translate(${MENU_WIDTH}rem,0)`,
  });
  const settingsStyle = useSpring({
    transform: showMenu
      ? "translate(0rem, 0)"
      : `translate(${MENU_WIDTH}rem,0)`,
  });
  const caretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "sketches"),
  });
  const settingsCaretStyles = useSpring({
    transform: getCaretRotation(showMenu, openMenu === "settings"),
  });
  console.log(showMenu, openMenu);

  const handleCaret = (menu: TMenu) => {
    if (!showMenu) {
      setShowMenu(true);
      setOpenMenu(menu);
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
        <SettingsCaret
          style={settingsCaretStyles}
          onClick={() => handleCaret("settings")}
        >
          <FaCaretRight size={30} />
        </SettingsCaret>
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
      </AnimatedMenu>
    </>
  );
};
