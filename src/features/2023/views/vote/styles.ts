import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { md: 'row', xs: 'column' },
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 'calc(100vh - 80px)',
  width: '100%',
  maxWidth: 1120,
  mt: { xs: 56, md: 10 },
  mb: { xs: 40, md: 0 },
  mx: 'auto',
  gap: 4,
  rowGap: 12,
  px: 3,
  zIndex: (theme) => theme.zIndex.tooltip
};
