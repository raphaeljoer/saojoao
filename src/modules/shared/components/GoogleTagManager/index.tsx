import Script from 'next/script';

type Props = {
  id: string;
};

export const GoogleTagManager = ({ id }: Props) => {
  return (
    <div className="google-tag-manager">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${id}');
        `}
      </Script>
    </div>
  );
};
