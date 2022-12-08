import React, { useCallback, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSkullCrossbones } from "react-icons/fa";
import * as R from "ramda";
import styled from "styled-components";

import { Button } from "../../../../../components/ui/Button";
import { LabelText } from "../../../../../components/ui/Label";
import { useSettings } from "../../../../../hooks/useSettings";

import { AddScript } from "./components/AddScript";
export interface IScriptSettingsProps {}

const StyledScriptSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
`;

/**
 *
 * TODO: Set which scripts are always loaded
 * - allow scripts to be persisted for a specific sketch (maybe? or P5LIVE route of defining in sketch?)
 * - make less ugly...
 */

export const ScriptSettings: React.FC<IScriptSettingsProps> = ({
  ...restProps
}) => {
  const { userLoadedScripts, setUserLoadedScripts } = useSettings();
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const removeScript = useCallback(
    (id: string) => {
      setUserLoadedScripts(userLoadedScripts.filter((s) => s.id !== id));
      setConfirmRemove(null);
    },
    [setUserLoadedScripts, userLoadedScripts, setConfirmRemove]
  );

  const changeScriptPosition = useCallback(
    (id: string, delta: number) => {
      const index = userLoadedScripts.findIndex((s) => s.id == id);
      setUserLoadedScripts(R.move(index, index + delta, userLoadedScripts));
    },
    [setUserLoadedScripts, userLoadedScripts]
  );
  return (
    <StyledScriptSettings {...restProps}>
      {confirmRemove && (
        <div>
          <LabelText>
            Confirm removal of <code>{confirmRemove}</code>
          </LabelText>
          <ConfirmationButtons>
            <Button onClick={() => removeScript(confirmRemove)}>remove</Button>
            <Button onClick={() => setConfirmRemove(null)}>cancel</Button>
          </ConfirmationButtons>
        </div>
      )}
      <b>Scripts loaded for every sketch</b>
      <div>
        {userLoadedScripts.map((script) => (
          <div key={script.id}>
            <IconRow>
              <LabelText>{script.id}</LabelText>

              <FaSkullCrossbones onClick={() => setConfirmRemove(script.id)} />
              <FaArrowDown onClick={() => changeScriptPosition(script.id, 1)} />
              <FaArrowUp onClick={() => changeScriptPosition(script.id, -1)} />
            </IconRow>
            <small>{script.path}</small>
          </div>
        ))}
      </div>

      <b>Add</b>
      <AddScript />
    </StyledScriptSettings>
  );
};
