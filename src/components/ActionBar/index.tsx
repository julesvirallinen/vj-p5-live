import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useSketchManager } from "../../hooks/useSketchManager";
import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../../Providers/SettingsProvider";

export interface IActionBarProps {}

const StyledActionBar = styled.div`
  width: 70%;
  height: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: #00000021;
  border-style: none;
  color: #ffffffc7;

  :focus-visible {
    outline-color: #ff03036b;
    color: #ffffffc7;
  }
`;

export const ActionBar: React.FC<IActionBarProps> = ({ ...restProps }) => {
  const [command, setCommand] = useState(">");
  const { sketches, showActionBar } = useSettingsStateContext();
  const { loadSketch, newSketch } = useSketchManager();
  const dispatch = useSettingsDispatchContext();
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
      const toggleRegex = /(m|(menu))\s*$/;
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
