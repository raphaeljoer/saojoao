import { ThemeOptions } from '@mui/material';

export const Roboto = 'Roboto, Arial, sans-serif';
export const Odibee = 'Odibee Sans, Victor, Arial, sans-serif';

export const typography: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: Odibee
    },
    h2: {
      fontFamily: Odibee
    },
    h3: {
      fontFamily: Odibee
    },
    h4: {
      fontFamily: Odibee
    },
    h5: {
      fontFamily: Odibee
    },
    h6: {
      fontFamily: Odibee
    },
    body1: {
      fontFamily: Roboto
    },
    body2: {
      fontFamily: Roboto
    },
    caption: {
      fontFamily: Roboto
    },
    button: {
      fontFamily: Roboto,
      textTransform: 'unset'
    }
  }
};
