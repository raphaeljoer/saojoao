import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    lg: 'repeat(3, 1fr)',
    md: 'repeat(2, 1fr)',
    xs: 'repeat(1, 1fr)'
  },
  gridColumnGap: 24,
  gridRowGap: 96,
  maxWidth: { md: 900, lg: 1280 },
  justifyItems: 'center',
  alignItems: 'center',
  width: '100%',
  mx: 'auto',
  mt: 9,
  pb: 20
};
