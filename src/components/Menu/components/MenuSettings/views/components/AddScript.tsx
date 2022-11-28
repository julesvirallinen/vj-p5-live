import React, { useState } from "react";
import styled from "styled-components";
import { useSettings } from "../../../../../../hooks/useSettings";

export interface IAddScriptProps {}

const sanitizeId = (id: string) => id.replace(/[^A-Za-z_-]+/g, "");

const StyledAddScript = styled.div``;

export const AddScript: React.FC<IAddScriptProps> = ({ ...restProps }) => {
  const { userLoadedScripts, setUserLoadedScripts } = useSettings();
  const [idInput, setIdInput] = useState("");
  const [srcInput, setSrcInput] = useState("");

  const addScript = () => {
    setUserLoadedScripts([
      ...userLoadedScripts,
      { id: idInput, path: srcInput },
    ]);
    setIdInput("");
    setSrcInput("");
  };

  return (
    <StyledAddScript {...restProps}>
      id:
      <input
        onChange={(e) => setIdInput(sanitizeId(e.target.value))}
        value={idInput}
      ></input>
      src:
      <input
        value={srcInput}
        onChange={(e) => setSrcInput(e.target.value)}
      ></input>
      {srcInput.length > 0 && idInput.length > 0 && (
        <button onClick={() => addScript()}>Add</button>
      )}
    </StyledAddScript>
  );
};
