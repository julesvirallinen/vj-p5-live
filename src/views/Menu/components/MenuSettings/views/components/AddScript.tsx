import React, { useState } from "react";
import styled from "styled-components";
import { useSettings } from "../../../../../../hooks/useSettings";
import { Button } from "../../../../../../components/ui/Button";
import { Input } from "../../../../../../components/ui/Input";

export interface IAddScriptProps {}

const sanitizeId = (id: string) => id.replace(/[^A-Za-z_-]+/g, "");

const StyledAddScript = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
      <Input
        label="id"
        onChange={(e) => setIdInput(sanitizeId(e))}
        value={idInput}
      ></Input>
      <Input label="src" value={srcInput} onChange={setSrcInput}></Input>
      {srcInput.length > 0 && idInput.length > 0 && (
        <Button onClick={() => addScript()}>Add</Button>
      )}
    </StyledAddScript>
  );
};
