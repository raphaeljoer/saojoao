import { NextFont } from 'next/dist/compiled/@next/font';

type Props = {
  fonts: NextFont[];
  children: React.ReactNode;
};

export const Fonts = ({ fonts, children }: Props) => {
  const fontClasses = fonts.reduce((acc, font) => {
    return `${acc} ${font.className}`;
  }, '');

  return <div className={fontClasses}>{children}</div>;
};
