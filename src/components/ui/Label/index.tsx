import React from 'react';
import styled from 'styled-components';

export interface ILabelProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const StyledLabel = styled.label`
  display: flex;
  font-size: 0.7rem;
  line-height: 1rem;
  text-transform: uppercase;
  font-family: 'Fredoka One';
  align-items: center;
`;
export const LabelText: React.FC<ILabelProps> = ({
  children,
  ...restProps
}) => {
  return <StyledLabel {...restProps}>{children}</StyledLabel>;
};
