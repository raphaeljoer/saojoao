import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export const item: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: `linear-gradient(to bottom right, rgba(235, 23, 95, 1) 0%, rgba(235, 23, 95, 0.5) 100%)`,
  borderRadius: 4,
  boxShadow: '0 0 2rem rgba(0, 0, 0, 0.3)',
  mx: 'auto',
  p: 2,
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  MozBackdropFilter: 'blur(4px)'
};

export const content: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: 1,
  my: 'auto',
  width: '100%',
  height: '100%',
  ml: { xs: 2, sm: 3 }
};

export const artist: SxProps<Theme> = {
  overflowWrap: 'anywhere',
  fontWeight: 400,
  lineHeight: 1,
  fontSize: { xs: 24, md: 32 },
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2
};

export const title: SxProps<Theme> = {
  overflowWrap: 'anywhere',
  fontWeight: 500,
  lineHeight: 1.2,
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3
};
