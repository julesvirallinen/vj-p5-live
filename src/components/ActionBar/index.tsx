import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useSketchManager } from "../../hooks/useSketchManager";
import { useSettingsStateContext } from "../../Providers/SettingsProvider";

export interface IActionBarProps {}

const StyledActionBar = styled.div`
  width: 70%;
  height: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: #000;
  border-style: none;
`;

export const ActionBar: React.FC<IActionBarProps> = ({ ...restProps }) => {
  const [command, setCommand] = useState(">");
  const { sketches } = useSettingsStateContext();
  const { loadSketch } = useSketchManager();

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const commandRegex = /(s )(.+)$/;
      const match = command.match(commandRegex);

      if (match && match[1] == "s ") {
        const sketchToLoad = sketches.find((sketch) =>
          sketch.name.includes(match[2])
        );
        sketchToLoad && loadSketch(sketchToLoad);
      }
    }
  };

  return (
    <StyledActionBar {...restProps}>
      <StyledInput
        value={command}
        onChange={(event) => setCommand(event.target.value)}
        onKeyDown={handleKeyDown}
      ></StyledInput>
    </StyledActionBar>
  );
};
