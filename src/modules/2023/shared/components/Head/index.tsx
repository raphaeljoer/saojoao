import Head from 'next/head';

type Props = {
  pageName: string;
  description?: string;
};

export const MetaTags = (props: Props) => {
  const title = `${process.env.SM_META_TAG_TITLE} | ${props.pageName}`;
  const url = process.env.SM_META_TAG_URL || 'https://suamusica.com.br/';
  const description = props?.description || process.env.SM_META_TAG_DESCRIPTION;
  const image = '/assets/cover-thumb.png';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
      <meta name="theme-color" content="#eb175f" />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};
