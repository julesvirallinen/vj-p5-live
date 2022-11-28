import React, { useState } from "react";
import styled from "styled-components";
import { useSettings } from "../../../../../../hooks/useSettings";
import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";

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
      <Input
        onChange={(e) => setIdInput(sanitizeId(e))}
        value={idInput}
      ></Input>
      src:
      <Input value={srcInput} onChange={setSrcInput}></Input>
      {srcInput.length > 0 && idInput.length > 0 && (
        <Button onClick={() => addScript()}>Add</Button>
      )}
    </StyledAddScript>
  );
};
