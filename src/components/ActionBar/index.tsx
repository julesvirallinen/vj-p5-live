import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";

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

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      console.log("do validate");
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
