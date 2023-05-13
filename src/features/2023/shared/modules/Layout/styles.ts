import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  minWidth: 320,
  width: '100vw',
  height: '100%',
  background: `repeating-radial-gradient(
    circle,
    #CA025C,
    #CA025C 20px,
    #C00257 80px,
    #C00257 24px
  )`
};
