import { StylesProps } from '../../../../../shared/types/styles-props';

export const container: StylesProps = {
  alignItems: 'center',
  maxWidth: 520,
  width: '100%',
  mx: 'auto',
  p: 1,
  pb: 12
};

export const title: StylesProps = {
  textAlign: 'center',
  lineHeight: 1,
  fontSize: { xl: 56, lg: 48, xs: 40 }
};

export const subTitle: StylesProps = {
  textAlign: 'center',
  lineHeight: 1,
  fontSize: { xl: 48, lg: 40, xs: 32 },
  color: 'primary.main'
};
