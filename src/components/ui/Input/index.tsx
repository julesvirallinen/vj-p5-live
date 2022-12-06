import React from "react";
import styled from "styled-components";
import { LabelText } from "../Label";

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

// hacky, figure this out...
type TDefaultProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "ref" | "onChange" | "value"
>;

export interface IInputProps<
  T extends string | number | readonly string[] | undefined = string
> {
  onChange?: (value: string) => void;
  value: T;
  label?: string;
}

const StyledInput = styled.input`
  height: 2rem;
  background-color: transparent;
  border-color: ${(props) => props.theme.colors.primary};
  border-style: solid;
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem;
  font-family: "Roboto Mono", cursive;
`;

export const Input = <
  T extends string | number | readonly string[] | undefined = string
>({
  onChange,
  value,
  label,
  ...restProps
}: IInputProps<T> & TDefaultProps): JSX.Element => {
  return (
    <StyledInputWrapper>
      {label && <LabelText>{label}</LabelText>}
      <StyledInput
        {...restProps}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </StyledInputWrapper>
  );
};
