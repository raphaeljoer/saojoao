import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  width: '100%',
  zIndex: (theme) => theme.zIndex.snackbar
};

export const logoContainer: SxProps<Theme> = {
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center'
};

export const logo: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  width: 180,
  height: 180,
  mt: 2,
  p: 4
};

export const element: SxProps<Theme> = {
  position: 'relative',
  width: '25%',
  maxWidth: 240,
  display: { xs: 'none', sm: 'block' }
};
