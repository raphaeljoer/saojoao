import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const cache = createCache({ key: 'css', prepend: true });

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Aqui você pode adicionar metatags, links para estilos globais, etc. */}
        </Head>
        <body>
          <CacheProvider value={cache}>
            <Main />
            <NextScript />
          </CacheProvider>
        </body>
      </Html>
    );
  }
}
