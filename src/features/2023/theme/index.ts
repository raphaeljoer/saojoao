//material-ui
import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';
//theme
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';
import { shadows } from './shadows';

export const lightTheme: ThemeOptions = {
  ...palette,
  ...typography,
  ...components,
  ...shadows,
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
};

export const theme = createTheme(lightTheme);

/*
 * Documentation:
 * https://material-ui.com/customization/themes/
 *
 * Default Theme:
 * https://next--material-ui.netlify.app/customization/default-theme/
 *
 */
