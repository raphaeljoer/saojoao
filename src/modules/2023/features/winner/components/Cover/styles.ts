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
