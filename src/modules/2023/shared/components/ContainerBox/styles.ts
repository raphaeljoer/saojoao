import { StylesProps } from '@/modules/shared/types/styles-props';

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  mt: -18,
  width: '100%',
  height: 200,
  maxWidth: 340,
  p: 3,
  mx: 1,
  borderRadius: 6,
  boxShadow: '0 0 4rem rgba(0, 0, 0, 0.5)',
  bgcolor: 'secondary.light',
  background: `radial-gradient(circle, rgba(235, 23, 95, 0.9) 50%, rgba(192, 2, 83, 0.7) 100%);`,
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  MozBackdropFilter: 'blur(4px)'
};

export const title: StylesProps = {
  overflowWrap: 'anywhere',
  fontWeight: 400,
  lineHeight: 1,
  fontSize: 40,
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  color: 'text.primary'
};

export const info: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1
};

export const description: StylesProps = {
  overflowWrap: 'anywhere',
  fontWeight: 500,
  lineHeight: 1.2,
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3
};

export const button: StylesProps = {
  mt: 2,
  width: '100%',
  color: 'secondary.main',
  borderRadius: 4,
  fontWeight: 700,
  ':hover': {
    bgcolor: 'primary.dark',
    transform: 'scale(0.98)',
    transition: 'all 0.3s ease-out'
  },
  '&.Mui-disabled': {
    color: 'primary.main',
    opacity: 0.8
  }
};
