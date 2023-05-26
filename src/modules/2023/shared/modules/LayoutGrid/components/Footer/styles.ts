import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'flex',
  position: 'fixed',
  justifyContent: 'center',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: (theme) => theme.zIndex.snackbar
};

export const logoContainer: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  px: 2,
  py: 2,
  height: 'fit-content',
  alignItems: 'center',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: 'center',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  MozBackdropFilter: 'blur(16px)',
  boxShadow: '0px -4px 16px rgba(0, 0, 0, 0.1)'
};
