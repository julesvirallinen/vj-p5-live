import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { useSketchManager } from "../../hooks/useSketchManager";
import { ISettingsSketch } from "../../models/sketch";
import { useSettingsDispatchContext } from "../../providers/SettingsProvider";

export interface IActionBarProps {}

const StyledActionBar = styled.div`
  width: 70%;
  height: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border-style: none;
  background-color: rgb(0, 0, 0, 20%);

  color: #ffffffc7;

  :focus-visible {
    outline-color: ${(props) => props.theme.colors.primary};
    background-color: rgb(0, 0, 0, 70%);
    color: #ffffffc7;
  }
`;

type THelpers = {
  loadSketch: (sketch: ISettingsSketch) => void;
  sketches: ISettingsSketch[];
};

type THandler = (helpers: THelpers) => (command: string) => void;

type TCommand = {
  name: string;
  shortCommand: string;
  fullCommand: string;
  handler: THandler;
};
const COMMANDS: TCommand[] = [
  {
    name: "Toggle menu",
    shortCommand: "s",
    fullCommand: "sketch",
    handler:
      ({ sketches, loadSketch }) =>
      (options: string) => {
        const sketchToLoad = sketches.find((sketch) =>
          sketch.name.includes(options)
        );
        sketchToLoad && loadSketch(sketchToLoad);
      },
  },
];

const AnimatedActionBar = animated(StyledActionBar);

export const ActionBar: React.FC<IActionBarProps> = ({ ...restProps }) => {
  const [command, setCommand] = useState(">");
  const { sketches, showActionBar, toggleHideEditor } = useSettings();
  const { loadSketch, newSketch, loadDefaultSketchTemplate } =
    useSketchManager();
  const dispatch = useSettingsDispatchContext();
  const { hardRecompileSketch, recompileSketch, setActionBarRef } =
    useGlobalCommands();
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = useSpring({
    transform: showActionBar
      ? "translate(0rem, 0rem)"
      : `translate(0rem, 2rem)`,
  });
  /**
   *
   * TODO:
   * - [ ] actions defined in object and run dynamically
   * - [ ] action preview / seleciton on tab (with descriptions)
   * - [ ] some sort of preview for sketch selection (show matching sketches on tab?)
   *
   */

  useEffect(() => {
    setActionBarRef(inputRef);
  }, [inputRef, setActionBarRef]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const commandRegex = /(s|sketch|new)\s(.+)$/;
      const toggleRegex =
        /(m|(menu|recompile|reset|hideeditor|editdefault))\s*$/;
      const match = command.match(commandRegex);
      const toggleMatch = command.match(toggleRegex);
      if (match && match[1] == "s") {
        const sketchToLoad = sketches.find((sketch) =>
          sketch.name.includes(match[2])
        );
        sketchToLoad && loadSketch(sketchToLoad);
      } else if (match && match[1] == "new") {
        if (!match[2].length) return;
        newSketch(match[2]);
      } else if (toggleMatch && toggleMatch[1] == "recompile") {
        recompileSketch();
      } else if (toggleMatch && toggleMatch[1] == "reset") {
        hardRecompileSketch();
      } else if (toggleMatch && ["menu", "m"].includes(toggleMatch[1])) {
        dispatch({ type: "toggleShowMenu" });
      } else if (toggleMatch && ["hideeditor"].includes(toggleMatch[1])) {
        toggleHideEditor();
      } else if (toggleMatch && ["editdefault"].includes(toggleMatch[1])) {
        loadDefaultSketchTemplate();
      }
    }
  };

  return (
    <AnimatedActionBar {...restProps} style={styles}>
      <StyledInput
        ref={inputRef}
        autoFocus
        value={command}
        onChange={(event) => setCommand(event.target.value)}
        onKeyDown={handleKeyDown}
      ></StyledInput>
    </AnimatedActionBar>
  );
};
