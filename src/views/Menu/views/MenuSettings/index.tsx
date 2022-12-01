import React from "react";
import styled, { useTheme } from "styled-components";
import { useSettings } from "../../../../hooks/useSettings";
import { TTheme } from "../../../../providers/ThemeProvider";
import { ColorPicker } from "../../../../components/ColorPicker";
import { XYSelector } from "../../../../components/XYSelector";
import { Button } from "../../../../components/ui/Button";
import { FaBullseye } from "react-icons/fa";

export interface IMenuSettingsProps {}

const StyledMenuSettings = styled.div`
  margin: 0 1rem;
`;

const StyledOpacitySlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2rem;
  width: 100%;
  height: 25px;
  background: #000;
  border: 1px solid ${(props) => props.theme.colors.primary};
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    opacity: 0.5;
    height: 1.5rem;
    background-color: ${(props) => `${props.theme.colors.secondary}`};
    border-radius: 2rem;
    cursor: pointer;
  }
  ::-webkit-slider-thumb:hover {
    opacity: 1;
  }
`;

export const ColorPickerWrapper = styled.div`
  position: relative;
  height: 2rem;
  width: 100%;
`;

export const MenuSettings: React.FC<IMenuSettingsProps> = ({
  ...restProps
}) => {
  const {
    canvas: { percentDimmed, width, height, offset = [0, 0] },
    setCanvasDimmedPercent,
    setEditorBackgroundColor,
    setEditorTextColor,
    setThemePrimaryColor,
    setThemeSecondaryColor,
    setCanvasWidth,
    setCanvasHeight,
    setOffset,
  } = useSettings();
  const theme: TTheme = useTheme();

  return (
    <StyledMenuSettings {...restProps}>
      <>
        Canvas dimming
        <StyledOpacitySlider
          type={"range"}
          value={percentDimmed}
          onChange={(event) =>
            setCanvasDimmedPercent(Number.parseInt(event.target.value))
          }
        />
      </>
      <>
        Canvas width
        <StyledOpacitySlider
          type={"range"}
          value={width}
          onChange={(event) =>
            setCanvasWidth(Number.parseInt(event.target.value))
          }
        />
      </>
      <>
        Canvas height
        <StyledOpacitySlider
          type={"range"}
          value={height}
          onChange={(event) =>
            setCanvasHeight(Number.parseInt(event.target.value))
          }
        />
      </>
      <>
        Canvas position
        <XYSelector
          xValue={offset[0]}
          yValue={offset[1]}
          onChange={(x, y) => setOffset([x, y])}
        />
        <Button onClick={() => setOffset([50, 50])}>
          <FaBullseye />
        </Button>
      </>
      <>
        Editor bg-color
        <ColorPickerWrapper>
          <ColorPicker
            color={theme.editor.textBackground}
            onChange={(c) => {
              setEditorBackgroundColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        code
        <ColorPickerWrapper>
          <ColorPicker
            color={theme.editor.textColor}
            onChange={(c) => {
              setEditorTextColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        Theme primary
        <ColorPickerWrapper>
          <ColorPicker
            color={theme.colors.primary}
            onChange={(c) => {
              setThemePrimaryColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        Theme secondary
        <ColorPickerWrapper>
          <ColorPicker
            color={theme.colors.secondary}
            onChange={(c) => {
              setThemeSecondaryColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
    </StyledMenuSettings>
  );
};
