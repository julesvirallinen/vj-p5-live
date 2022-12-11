import React from 'react';
import styled from 'styled-components';

import { LabelText } from '~/components/ui/Label';
import { Column, Row } from '~/components/ui/Layout';
import { useSettings } from '~/hooks/useSettings';

export interface IAppHeaderProps {}

const StyledAppHeader = styled(Column)`
  gap: 1rem;
`;

const AppHeaderText = styled(LabelText)`
  font-size: 1.5rem;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const LabelLink = styled(LabelText)`
  text-decoration: underline;
  cursor: pointer;
`;

export const AppHeader: React.FC<IAppHeaderProps> = ({ ...restProps }) => {
  const { setOpenMenu } = useSettings();

  return (
    <StyledAppHeader {...restProps}>
      <div>
        <AppHeaderText>VJ P5.JS</AppHeaderText>
        <LabelText>(name pending)</LabelText>
      </div>
      <Row $gap={1}>
        <LabelLink onClick={() => setOpenMenu('about')}>about</LabelLink>
        <LabelLink onClick={() => setOpenMenu('advanced')}>Advanced</LabelLink>
      </Row>
      <Line />
    </StyledAppHeader>
  );
};
