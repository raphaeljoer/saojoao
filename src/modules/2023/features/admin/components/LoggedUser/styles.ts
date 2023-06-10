import { StylesProps } from '@/modules/shared/types/styles-props';

export const container: StylesProps = {
  alignItems: 'center',
  justifyContent: 'center'
};

export const avatar: StylesProps = {
  fontWeight: 500,
  width: 'fit-content',
  bgcolor: 'primary.main',
  color: 'secondary.dark',
  mx: 'auto',
  boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.15)'
};

export const button: StylesProps = {
  fontWeight: 700
};
