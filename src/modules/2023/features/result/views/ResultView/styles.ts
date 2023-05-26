import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 480,
  px: 2,
  height: '100%',
  mx: 'auto',
  pt: 4,
  pb: 12
};
