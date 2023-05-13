import { GoogleTagManager } from '@/modules/shared/components/GoogleTagManager';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const cache = createCache({ key: 'css', prepend: true });
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <GoogleTagManager id={process.env.SM_GOOGLE_TAG_MANAGER_ID || ''} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Odibee+Sans&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
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
