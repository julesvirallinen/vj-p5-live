import React, { KeyboardEventHandler, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaShareSquare } from "react-icons/fa";
import styled from "styled-components";
import { useCurrentSketch } from "../../../../hooks/useCurrentSketch";
import { useGlobalCommands } from "../../../../hooks/useGlobalCommands";
import { useSettings } from "../../../../hooks/useSettings";
import { useSketchManager } from "../../../../hooks/useSketchManager";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuButtons = styled.div`
  display: flex;

  gap: 1rem;
`;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { name, id } = useCurrentSketch();
  const { renameSketch } = useSketchManager();
  const [newName, setNewname] = useState(name);
  const { hideEditor, toggleHideEditor } = useSettings();
  const { setCanvasPopupOpen } = useGlobalCommands();

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
      <MenuButtons>
        <Button onClick={toggleHideEditor}>
          {hideEditor ? <FaRegEye /> : <FaRegEyeSlash />}
        </Button>
        <Button onClick={() => setCanvasPopupOpen(true)}>
          <FaShareSquare />
        </Button>
      </MenuButtons>
    </StyledCurrentSketchSettings>
  );
};
