import { ThemeOptions } from '@mui/material';

export const Montserrat = 'Montserrat, sans-serif';
export const Rubik = 'Rubik, sans-serif';

export const typography: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: Montserrat
    },
    h2: {
      fontFamily: Montserrat
    },
    h3: {
      fontFamily: Montserrat
    },
    h4: {
      fontFamily: Montserrat
    },
    h5: {
      fontFamily: Rubik
    },
    h6: {
      fontFamily: Rubik
    },
    body1: {
      fontFamily: Rubik
    },
    body2: {
      fontFamily: Rubik
    },
    caption: {
      fontFamily: Rubik
    },
    button: {
      fontFamily: Montserrat,
      textTransform: 'unset'
    }
  }
};
