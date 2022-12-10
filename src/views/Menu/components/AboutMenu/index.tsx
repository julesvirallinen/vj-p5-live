import React from "react";
import styled from "styled-components";

import { Column } from "~/components/ui/Layout";
import { Regular } from "~/components/ui/Text";
import { AppHeader } from "~/views/Menu/components/AppHeader";

export interface IAboutMenuProps {}

const StyledAboutMenu = styled(Column)`
  gap: 1rem;
`;

export const AboutMenu: React.FC<IAboutMenuProps> = ({ ...restProps }) => {
  return (
    <StyledAboutMenu {...restProps}>
      <AppHeader />
      <Column>
        <Regular>
          {"Created by "}
          <a href={"https://www.instagram.com/julesvisualiinen/"}>
            @julesvirallinen
          </a>
          {
            " (for now!). Any kinds of contributions are very welcome! Let's make this great together. "
          }
        </Regular>
        <Regular>
          <a href={"https://github.com/julesvirallinen/vj-p5-live"}>
            Github repo
          </a>
        </Regular>
      </Column>
    </StyledAboutMenu>
  );
};
