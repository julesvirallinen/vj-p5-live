import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { LabelText } from '../Label';

export interface IButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding: 0;

  border-radius: 0.5rem;
  padding: 0.1rem 0.4rem;
  font-size: 0.8rem;
  background-color: transparent;
  cursor: pointer;
  outline-color: ${(props) => props.theme.colors.primary};
  outline: 0.1rem solid;
  outline-style: solid;

  :hover {
    outline: 0.2rem solid ${(props) => props.theme.colors.primary};
  }
`;

export const Button: React.FC<IButtonProps> = ({ children, ...restProps }) => {
  return (
    <StyledButton {...restProps}>
      <LabelText>{children}</LabelText>
    </StyledButton>
  );
};
