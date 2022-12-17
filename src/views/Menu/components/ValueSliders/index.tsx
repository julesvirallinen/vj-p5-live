import React from 'react';
import styled from 'styled-components';

export interface IValueSlidersProps {}

const StyledValueSliders = styled.div``;

export const ValueSliders: React.FC<IValueSlidersProps> = ({
  ...restProps
}) => {
  return <StyledValueSliders {...restProps}>apua lol apua</StyledValueSliders>;
};
