import React from 'react';
import styled, { useTheme } from 'styled-components';

import { ColorPicker } from '../../../../components/ColorPicker';
import { Input } from '../../../../components/ui/Input';
import { LabelText } from '../../../../components/ui/Label';
import { useSettings } from '../../../../hooks/useSettings';
import { TTheme } from '../../../../providers/ThemeProvider';

export interface IMenuSettingsProps {}

const StyledMenuSettings = styled.div`
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxMenu = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const StyledOpacitySlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2rem;
  width: 100%;
  height: 25px;
  background: #000;
  border: 1px solid ${(props) => props.theme.colors.primary};
  /* opacity: 0.7; */
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    /* opacity: 0.5; */
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
  /* height: 2rem; */
  width: 100%;
`;

export const MenuSettings: React.FC<IMenuSettingsProps> = ({
  ...restProps
}) => {
  const {
    canvas: { percentDimmed },
    setCanvasDimmedPercent,
    setEditorBackgroundColor,
    setEditorTextColor,
    setThemePrimaryColor,
    setThemeSecondaryColor,
    compileAfterMs,
    setCompileAfterMs,
    setMaptasticEnabled,
    maptasticEnabled,
  } = useSettings();
  // eslint-disable-next-line
  // @ts-ignore
  const theme: TTheme = useTheme();

  return (
    <StyledMenuSettings {...restProps}>
      <div>
        <LabelText>{'Canvas dimming'}</LabelText>
        <StyledOpacitySlider
          type={'range'}
          value={percentDimmed}
          onChange={(event) =>
            setCanvasDimmedPercent(Number.parseInt(event.target.value))
          }
        />
      </div>
      <>
        <Input<number>
          label="Compile after ms"
          value={compileAfterMs}
          onChange={(value) => setCompileAfterMs(parseInt(value))}
        />
      </>
      <>
        <ColorPickerWrapper>
          <ColorPicker
            label="Editor background"
            color={theme.editor.textBackground}
            onChange={(c) => {
              setEditorBackgroundColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        <ColorPickerWrapper>
          <ColorPicker
            label="Editor font"
            color={theme.editor.textColor}
            onChange={(c) => {
              setEditorTextColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        <ColorPickerWrapper>
          <ColorPicker
            label="Theme primary"
            color={theme.colors.primary}
            onChange={(c) => {
              setThemePrimaryColor(c);
            }}
          />
        </ColorPickerWrapper>
      </>
      <>
        <ColorPickerWrapper>
          <ColorPicker
            color={theme.colors.secondary}
            onChange={(c) => {
              setThemeSecondaryColor(c);
            }}
            label="Theme secondary"
          />
        </ColorPickerWrapper>
      </>
      <CheckboxMenu>
        <LabelText>{'Maptastic enabled'}</LabelText>
        <input
          type={'checkbox'}
          checked={maptasticEnabled}
          onChange={() => setMaptasticEnabled(!maptasticEnabled)}
        />
      </CheckboxMenu>
    </StyledMenuSettings>
  );
};
