import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const cache = createCache({ key: 'css', prepend: true });
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/apple-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/apple-icon-180x180.svg"
          />
          <link
            rel="apple-touch-icon"
            sizes="1024x1024"
            href="/assets/apple-icon-1024x1024.svg"
          />
          <link
            rel="apple-touch-icon"
            sizes="1024x1024"
            href="/assets/apple-icon-1024x1024.png"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-requires-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Talento 2023" />
          <meta
            name="apple-mobile-web-app-navigation-override"
            content="minimal-ui"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#eb175f"
          />
          {/* <!-- iPhone Xs Max (1242px x 2688px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            href="/assets/apple-launch-1242x2688.png"
          />
          {/* <!-- iPhone Xr (828px x 1792px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-828x1792.png"
          />
          {/* <!-- iPhone X, Xs (1125px x 2436px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            href="/assets/apple-launch-1125x2436.png"
          />
          {/* <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
            href="/assets/apple-launch-1242x2208.png"
          />
          {/* <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-750x1334.png"
          />
          {/* <!-- iPad Pro 12.9" (2048px x 2732px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-2048x2732.png"
          />
          {/* <!-- iPad Pro 11” (1668px x 2388px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-1668x2388.png"
          />
          {/* <!-- iPad Pro 10.5" (1668px x 2224px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-1668x2224.png"
          />
          {/* <!-- iPad Mini, Air (1536px x 2048px) -->  */}
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            href="/assets/apple-launch-1536x2048.png"
          />
        </Head>
        <body className={`background`}>
          <CacheProvider value={cache}>
            <Main />
            <NextScript />
          </CacheProvider>
        </body>
      </Html>
    );
  }
}
