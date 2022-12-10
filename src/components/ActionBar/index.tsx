import React, {
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { animated, useSpring } from "react-spring";
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

type THandler = (options?: string[]) => void;

type TCommand = {
  name: string;
  shortCommand: string;
  fullCommand: string;
  handler: THandler;
};

const AnimatedActionBar = animated(StyledActionBar);

export const ActionBar: React.FC<IActionBarProps> = ({ ...restProps }) => {
  const [command, setCommand] = useState("");

  const {
    sketches,
    showActionBar,
    toggleHideEditor,
    toggleShowMenu,
    toggleShowConsoleFeed,
  } = useSettings();

  const { loadSketch, newSketch, loadDefaultSketchTemplate } =
    useSketchManager();
  const { setActionBarRef } = useGlobalCommands();
  const inputRef = useRef<HTMLInputElement>(null);

  const styles = useSpring({
    transform: showActionBar
      ? "translate(0rem, 0rem)"
      : `translate(0rem, 2rem)`,
  });
  /**
   *
   * TODO:
   * - [ ] action preview / seleciton on tab (with descriptions)
   * - [ ] some sort of preview for sketch selection (show matching sketches on tab?)
   *
   */

  useEffect(() => {
    setActionBarRef(inputRef);
  }, [inputRef, setActionBarRef]);

  const commands: TCommand[] = [
    {
      name: "Toggle menu",
      shortCommand: "m",
      fullCommand: "menu",
      handler: () => toggleShowMenu(),
    },
    {
      name: "Edit default sketch template",
      shortCommand: "ed",
      fullCommand: "edittemplate",
      handler: () => loadDefaultSketchTemplate(),
    },
    {
      name: "Toggle show console feed",
      shortCommand: "cf",
      fullCommand: "toggleconsole",
      handler: () => toggleShowConsoleFeed(),
    },
    {
      name: "Load sketch",
      shortCommand: "s",
      fullCommand: "sketch",
      handler: (options) => {
        if (!options) return;
        const search = options.join(" ");

        const sketchToLoad = sketches.find((sketch) =>
          sketch.name.includes(search)
        );
        sketchToLoad && loadSketch(sketchToLoad);
      },
    },
    {
      name: "Create new sketch",
      shortCommand: "n",
      fullCommand: "new",
      handler: (options) => {
        if (!options) return;
        const name = options.join(" ");

        newSketch(name);
      },
    },
    {
      name: "Hide editor code",
      shortCommand: "h",
      fullCommand: "hide",
      handler: () => toggleHideEditor(),
    },
  ];

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const [action, ...options] = command.split(" ");

      const actionDef = commands.find(
        (c) => c.shortCommand === action || c.fullCommand === action
      );

      if (actionDef) {
        actionDef.handler(options);
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
