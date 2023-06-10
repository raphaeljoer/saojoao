import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const tag: SxProps<Theme> = {
  bgcolor: 'primary.main',
  color: 'secondary.dark',
  fontWeight: 500
};

export const container: SxProps<Theme> = {
  maxWidth: 520,
  width: '100%',
  mx: 'auto',
  p: 2,
  pb: 12
};

export const content: SxProps<Theme> = {
  p: 3,
  bgcolor: 'common.white',
  color: 'rgba(0, 0, 0, 0.7)',
  borderRadius: 4,
  boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.3)',
  border: '2px solid',
  borderColor: 'background.paper'
};
