import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const container: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '212px 1fr 80px',
  gridColumnGap: 16,
  gridRowGap: 16,
  minWidth: 320,
  width: '100vw',
  height: '100vh'
};
