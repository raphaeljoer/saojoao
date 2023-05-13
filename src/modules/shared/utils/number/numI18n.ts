type Params = {
  value: number | string;
  locale?: string;
};

export const numI18n = ({ value, locale = 'pt-BR' }: Params): string =>
  Intl.NumberFormat(locale).format(Number(value));
