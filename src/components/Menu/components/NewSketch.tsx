import React, { useState } from "react";
import styled from "styled-components";
import { useSketchManager } from "../../../hooks/useSketchManager";
import { FaPlus } from "react-icons/fa";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export interface INewSketchProps {}

const StyledNewSketch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  flex: 1 1 auto;
  margin-right: 2rem;
`;

const CreateButton = styled(Button)``;

const SketchInput = styled(Input)`
  width: 7rem;
`;

export const NewSketch: React.FC<INewSketchProps> = ({ ...restProps }) => {
  const { newSketch } = useSketchManager();
  const [name, setName] = useState("new sketch");
  return (
    <StyledNewSketch {...restProps}>
      <SketchInput value={name} onChange={setName} />
      <CreateButton onClick={() => newSketch(name)}>
        <FaPlus />
      </CreateButton>
    </StyledNewSketch>
  );
};
