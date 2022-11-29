import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useCurrentSketch } from "../../../../hooks/useCurrentSketch";
import { useSketchManager } from "../../../../hooks/useSketchManager";
import { Input } from "../ui/Input";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { name, id } = useCurrentSketch();
  const { renameSketch } = useSketchManager();
  const [newName, setNewname] = useState(name);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      renameSketch(id, newName);
    }

    if (event.key === "Escape") {
      setNewname(name);
    }
  };

  return (
    <StyledCurrentSketchSettings {...restProps}>
      <Input
        value={newName}
        onKeyDown={handleKeyDown}
        onChange={setNewname}
      ></Input>
    </StyledCurrentSketchSettings>
  );
};
