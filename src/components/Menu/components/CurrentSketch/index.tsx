import React, { KeyboardEventHandler, useState } from "react";
import styled from "styled-components";
import { useCurrentSketch } from "../../../../hooks/useCurrentSketch";
import { useGlobalCommands } from "../../../../hooks/useGlobalCommands";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { name, id } = useCurrentSketch();
  const { renameSketch } = useSketchManager();
  const [newName, setNewname] = useState(name);
  const { hideEditor, toggleHideEditor } = useSettings();
  const { canvasPopupOpen, setCanvasPopupOpen } = useGlobalCommands();

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
      <Button onClick={toggleHideEditor}>
        {hideEditor ? "Show editor" : "Hide editor"}
      </Button>
      <Button onClick={() => setCanvasPopupOpen(true)}>
        Open visuals popup
      </Button>
    </StyledCurrentSketchSettings>
  );
};
