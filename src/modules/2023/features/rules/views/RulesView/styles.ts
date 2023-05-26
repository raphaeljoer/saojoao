import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const title: SxProps<Theme> = {
  fontSize: { xs: 32, md: 40, lg: 54 },
  fontWeight: 500,
  textAlign: 'center'
};

export const container: SxProps<Theme> = {
  maxWidth: 768,
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
