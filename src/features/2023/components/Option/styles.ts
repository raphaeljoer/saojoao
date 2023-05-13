import { StylesProps } from "@/features/shared/types/styles-props";

export const container: StylesProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  maxHeight: 296,
  maxWidth: 344,
  p: 3,
  borderRadius: 6,
  boxShadow: '0 0 4rem rgba(0, 0, 0, 0.4)',
  bgcolor: 'secondary.light',
  background: `radial-gradient(circle, rgba(202,2,92,1) 50%, rgba(192,2,83,1) 100%)`
};

export const title: StylesProps = {
  overflowWrap: 'anywhere',
  fontWeight: 700,
  lineHeight: 1,
  fontSize: { xs: 24, md: 24 },
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  mb: 2,
  mt: 2,
  color: 'primary.main'
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