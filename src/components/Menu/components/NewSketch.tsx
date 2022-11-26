import React, { useState } from "react";
import styled from "styled-components";
import { useSketchManager } from "../../../hooks/useSketchManager";
import { FaPlus } from "react-icons/fa";

export interface INewSketchProps {}

const StyledNewSketch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
`;

const SketchInput = styled.input`
  height: 1.5rem;
  width: 80%;
`;

export const NewSketch: React.FC<INewSketchProps> = ({ ...restProps }) => {
  const { newSketch } = useSketchManager();
  const [name, setName] = useState("new sketch");
  return (
    <StyledNewSketch {...restProps}>
      <SketchInput
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <CreateButton onClick={() => newSketch(name)}>
        <FaPlus />
      </CreateButton>
    </StyledNewSketch>
  );
};
