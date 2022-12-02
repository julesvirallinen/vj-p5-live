import React from "react";
import styled from "styled-components";

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
  onChange?: (value: T) => void;
  value: T;
}

const StyledInput = styled.input`
  height: 2rem;
  background-color: transparent;
  border-color: ${(props) => props.theme.colors.primary};
  border-style: solid;
  border-radius: 0.5rem;
  padding: 0.1rem 0.3rem; ;
`;

export const Input = <
  T extends string | number | readonly string[] | undefined = string
>({
  onChange,
  value,
  ...restProps
}: IInputProps<T> & TDefaultProps): JSX.Element => {
  return (
    <StyledInput
      {...restProps}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value as T)}
    />
  );
};
