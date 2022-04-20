import React from 'react';

import type { Theme as MuiTheme } from '@mui/material/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import {
  ThemeProvider as MaterialUiThemeProvider,
  StylesProvider,
} from '@mui/styles';
import {StyledEngineProvider} from '@mui/material/styles';
import { createGenerateClassName } from '@mui/styles';
import darkTheme from './DarkTheme/index';
import { themeOptions } from './themeOptions';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends MuiTheme {}
}

export { darkTheme };

export { StyledEngineProvider };

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'reactPage',
  productionPrefix: 'reactPage',
});
const theme = createTheme(adaptV4Theme(themeOptions));

export type ThemeProviderProps = {
  theme?: Theme;
};

export type Theme = typeof theme;

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return (
    <StylesProvider injectFirst={true} generateClassName={generateClassName}>
      <MaterialUiThemeProvider theme={props.theme || theme}>
        {props.children}
      </MaterialUiThemeProvider>
    </StylesProvider>
  );
};
