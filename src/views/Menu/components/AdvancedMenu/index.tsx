import React from 'react';
import styled from 'styled-components';

import { Column } from '~/components/ui/Layout';
import { Regular } from '~/components/ui/Text';
import { Travolta } from '~/views/Menu/components/AdvancedMenu/Travolta';

export interface IAdvancedMenuProps {}

const StyledAdvancedMenu = styled(Column)`
  align-items: center;
`;

const StyledTravolta = styled(Travolta)`
  > * {
    fill: ${(props) => props.theme.colors.primary};
  }
  width: 5rem;
  height: 5rem;
`;

export const AdvancedMenu: React.FC<IAdvancedMenuProps> = ({
  ...restProps
}) => {
  return (
    <StyledAdvancedMenu {...restProps}>
      <Regular>
        This is probably where data import / export and the other cool stuff
        would be...
      </Regular>
      <StyledTravolta />
    </StyledAdvancedMenu>
  );
};
