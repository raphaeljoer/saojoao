import { ThemeOptions } from '@mui/material';

export const palette: ThemeOptions = {
  palette: {
    common: {
      black: '#000',
      white: '#f3f0ef'
    },
    background: {
      paper: '#eb175f',
      default: '#ba0158'
    },
    primary: {
      light: '#FFC014',
      main: '#ffbb00',
      dark: '#E5A800',
      contrastText: '#f3f0ef'
    },
    button: {
      color: '#eb175f',
      colorHover: '#E30267',
      background: '#FFC014',
      backgroundHover: '#E5A800'
    },
    secondary: {
      light: '#E30267',
      main: '#eb175f',
      dark: '#980145',
      contrastText: '#f3f0ef'
    },
    text: {
      primary: '#f3f0ef',
      secondary: '#eb175f',
      disabled: 'rgba(0, 0, 0, 0.38)'
    }
  } as any
};
