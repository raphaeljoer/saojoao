import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const cover: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  mt: -10,
  width: 160,
  height: 160,
  border: '4px solid',
  borderColor: 'primary.main'
};

export const plays: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  pt: 0.5,
  right: 0,
  bgcolor: 'primary.main',
  zIndex: (theme) => theme.zIndex.drawer,
  borderRadius: 2
};
