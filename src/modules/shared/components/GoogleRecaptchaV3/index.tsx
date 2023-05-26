import Script from 'next/script';

type Props = {
  siteKey: string;
};

export const GoogleRecaptchaV3 = ({ siteKey }: Props) => {
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="afterInteractive"
    />
  );
};
