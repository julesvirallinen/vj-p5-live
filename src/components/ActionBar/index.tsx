import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { useSketchManager } from "../../hooks/useSketchManager";
import { ISettingsSketch } from "../../models/sketch";
import { useSettingsDispatchContext } from "../../Providers/SettingsProvider";

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

export const ActionBar: React.FC<IActionBarProps> = ({ ...restProps }) => {
  const [command, setCommand] = useState(">");
  const { sketches, showActionBar } = useSettings();
  const { loadSketch, newSketch } = useSketchManager();
  const dispatch = useSettingsDispatchContext();
  const { hardRecompileSketch, recompileSketch } = useGlobalCommands();
  /**
   *
   * TODO:
   * - [ ] actions defined in object and run dynamically
   * - [ ] action preview / seleciton on tab (with descriptions)
   * - [ ] some sort of preview for sketch selection (show matching sketches on tab?)
   *
   */

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const commandRegex = /(s|sketch|new)\s(.+)$/;
      const toggleRegex = /(m|(menu|recompile|reset))\s*$/;
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
      }
    }
  };

  if (!showActionBar) {
    return null;
  }

  return (
    <StyledActionBar {...restProps}>
      <StyledInput
        autoFocus
        value={command}
        onChange={(event) => setCommand(event.target.value)}
        onKeyDown={handleKeyDown}
      ></StyledInput>
    </StyledActionBar>
  );
};
