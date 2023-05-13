import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: (theme) => theme.zIndex.snackbar,
  mb: 2
};
