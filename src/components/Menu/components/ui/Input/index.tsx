import React from "react";
import styled from "styled-components";

export interface IInputProps {
  onChange: (value: string) => void;
  value: string;
}

const StyledInput = styled.input`
  height: 2rem;
  background-color: transparent;
  border-color: ${(props) => props.theme.colors.primary};
  border-style: solid;
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem; ;
`;

export const Input: React.FC<IInputProps> = ({
  onChange,
  value,
  ...restProps
}) => {
  return (
    <StyledInput
      {...restProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
