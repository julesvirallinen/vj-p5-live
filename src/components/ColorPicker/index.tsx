import React, { useRef, useState } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";
import styled from "styled-components";

import { useClickedOutside } from "../../hooks/useClickedOutside";
import { LabelText } from "../ui/Label";

export interface IColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const StyledColorPicker = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const StyledSwatch = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 3px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StyledPopOver = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: -5rem;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

  .react-colorful {
    width: 8rem;
    height: 9rem;
  }

  .react-colorful__pointer {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const Picker = styled(HexAlphaColorPicker)`
  z-index: 3;
`;

export const ColorPicker: React.FC<IColorPickerProps> = ({
  color,
  onChange,
  label,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement | null>(null);
  useClickedOutside(popover, () => setIsOpen(false));

  return (
    <>
      <StyledColorPicker {...restProps}>
        {label && <LabelText>{label}</LabelText>}
        <StyledSwatch
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
      </StyledColorPicker>
      {isOpen && (
        <StyledPopOver ref={popover}>
          <Picker color={color} onChange={onChange} />
          <HexColorInput color={color} onChange={onChange} />
        </StyledPopOver>
      )}
    </>
  );
};
