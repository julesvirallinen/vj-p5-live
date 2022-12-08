import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useSketchManager } from "../../../hooks/useSketchManager";

export interface INewSketchProps {}

const StyledNewSketch = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex: 1 1 auto;
  margin-right: 2rem;
  align-items: end;
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
      <SketchInput value={name} onChange={setName} label={"new sketch"} />
      <CreateButton onClick={() => newSketch(name)}>
        <FaPlus />
      </CreateButton>
    </StyledNewSketch>
  );
};
