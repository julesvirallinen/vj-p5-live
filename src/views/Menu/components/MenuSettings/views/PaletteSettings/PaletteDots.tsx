import React from "react";
import { BsFillCircleFill, BsSlashCircle } from "react-icons/bs";
import styled from "styled-components";

import { TColorCode } from "../../../../../../models/colors";

export interface IPaletteDotsProps {
  colors: (TColorCode | null)[];
  onClick?: () => void;
}

const ColorDots = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
`;
export const PaletteDots: React.FC<IPaletteDotsProps> = ({
  colors,
  ...restProps
}) => {
  return (
    <ColorDots {...restProps}>
      {colors.map((color, i) =>
        color ? (
          <BsFillCircleFill fill={color as string} key={i} />
        ) : (
          <BsSlashCircle key={i} fill={"red"} />
        )
      )}
    </ColorDots>
  );
};
