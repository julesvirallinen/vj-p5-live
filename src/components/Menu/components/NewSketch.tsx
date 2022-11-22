import React, { useState } from "react";
import styled from "styled-components";
import { useSketchManager } from "../../../hooks/useSketchManager";

export interface INewSketchProps {}

const StyledNewSketch = styled.div``;

export const NewSketch: React.FC<INewSketchProps> = ({ ...restProps }) => {
  const { newSketch } = useSketchManager();
  const [name, setName] = useState("new sketch");
  return (
    <StyledNewSketch {...restProps}>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={() => newSketch(name)}>Create</button>
    </StyledNewSketch>
  );
};
