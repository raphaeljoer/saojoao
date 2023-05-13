import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  position: 'absolute',
  top: -8,
  right: -8,
  display: 'flex',
  zIndex: (theme) => theme.zIndex.appBar,
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'primary.light',
  borderRadius: '50%',
  width: 32,
  height: 32
};
