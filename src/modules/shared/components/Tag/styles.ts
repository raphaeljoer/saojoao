import { blue, green, grey, orange, red } from '@mui/material/colors';
import { StylesProps } from '../../types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content'
};

export const message: StylesProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 1,
  m: 0,
  height: 20,
  px: 1,
  fontWeight: 700
};

export const bg = {
  info: blue[50],
  success: green[50],
  warning: orange[50],
  error: red[50],
  neutral: grey[200]
};

export const color = {
  info: blue[900],
  success: green[900],
  warning: orange[900],
  error: red[900],
  neutral: grey[900]
};
