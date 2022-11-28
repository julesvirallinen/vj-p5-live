import React, { useCallback, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSkullCrossbones } from "react-icons/fa";
import styled from "styled-components";
import { useSettings } from "../../../../../hooks/useSettings";
import { AddScript } from "./components/AddScript";
import * as R from "ramda";
export interface IScriptSettingsProps {}

const StyledScriptSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
        <>
          <b>Confirm removal of {confirmRemove}</b>
          <button onClick={() => setConfirmRemove(null)}>cancel</button>
          <button onClick={() => removeScript(confirmRemove)}>remove</button>
        </>
      )}
      <b>Scripts loaded for every sketch</b>
      <div>
        {userLoadedScripts.map((script) => (
          <div key={script.id}>
            {script.id}

            <FaSkullCrossbones onClick={() => setConfirmRemove(script.id)} />
            <FaArrowDown onClick={() => changeScriptPosition(script.id, 1)} />
            <FaArrowUp onClick={() => changeScriptPosition(script.id, -1)} />
            <small>{script.path}</small>
          </div>
        ))}
      </div>

      <b>Add</b>
      <AddScript />
    </StyledScriptSettings>
  );
};
