import React, { FC, ReactNode } from 'react';
import { mergeDeepLeft } from 'ramda';
import { ThemeProvider } from 'styled-components';

import { useSettings } from '../../hooks/useSettings';

const theme = {
  canvas: {
    opacity: 0.5,
  },
  editor: {
    textBackground: '#000',
    textColor: '#ccc1c1',
  },
  colors: {
    powderWhite: '#FFFDF9',
    persianGreen: '#06B49A',
    lightBlue: '#AFDBD2',
    onyx: '#36313D',
    darkPink: '#ccc1c1',
    primary: '#06B49A',
    secondary: '#AFDBD2',
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

export type TTheme = typeof theme;

export interface IThemeProviderProps {
  children: ReactNode;
}

const Theme: FC<IThemeProviderProps> = ({ children }) => {
  const { themeOverrides } = useSettings();

  const themeWithSettings = mergeDeepLeft(themeOverrides, theme);

  return <ThemeProvider theme={themeWithSettings}>{children}</ThemeProvider>;
};

export default Theme;
