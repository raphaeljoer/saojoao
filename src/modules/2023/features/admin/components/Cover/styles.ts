import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const cover: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 4,
  width: 104,
  height: 104,
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
  borderRadius: 2,
  fontSize: 11
};
