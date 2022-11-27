import React from "react";
import styled from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";

export interface IMenuSettingsProps {}

const StyledMenuSettings = styled.div``;

const StyledOpacitySlider = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  border-radius: 2rem;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #4a4949; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  max-width: 80%;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    opacity: 0.5;
    height: 1.5rem;
    background: #ffc1c198; /* Green background */
    border-radius: 2rem;
    cursor: pointer; /* Cursor on hover */
  }
  ::-webkit-slider-thumb:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }
`;

export const MenuSettings: React.FC<IMenuSettingsProps> = ({
  ...restProps
}) => {
  const { canvasOpacity, setCanvasOpacity } = useSettings();
  return (
    <StyledMenuSettings {...restProps}>
      Canvas dimming
      <StyledOpacitySlider
        type={"range"}
        value={canvasOpacity}
        onChange={(event) =>
          setCanvasOpacity(Number.parseInt(event.target.value))
        }
      />
    </StyledMenuSettings>
  );
};
