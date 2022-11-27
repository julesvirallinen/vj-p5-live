import React, { useEffect, useRef, useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import styled from "styled-components";

export interface IColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const StyledColorPicker = styled.div``;

const StyledSwatch = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 3px solid #6565657a;
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
    background-color: #6565657a;
    border-color: #6565657a;
  }
`;

const Picker = styled(HexAlphaColorPicker)`
  position: relative;
`;

export const ColorPicker: React.FC<IColorPickerProps> = ({
  color,
  onChange,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>();

  return (
    <StyledColorPicker {...restProps}>
      <StyledSwatch
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <StyledPopOver ref={popover.current}>
          <Picker color={color} onChange={onChange} />
        </StyledPopOver>
      )}
    </StyledColorPicker>
  );
};
