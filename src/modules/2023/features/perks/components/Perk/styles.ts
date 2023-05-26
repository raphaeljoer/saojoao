import { StylesProps } from '../../../../../shared/types/styles-props';

export const container: StylesProps = {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  bgcolor: '#016ff5',
  borderRadius: 4,
  maxWidth: 420,
  p: 2,
  boxShadow: '0 0 1rem rgba(0, 0, 0, 0.3)'
};

export const title: StylesProps = {
  fontSize: 20,
  fontWeight: 700
};

export const subTitle: StylesProps = {
  fontSize: 14,
  fontWeight: 500
};

export const content: StylesProps = {
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center'
};
