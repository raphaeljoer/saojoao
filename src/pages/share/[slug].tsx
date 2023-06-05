import { coreClient } from '@/core/main-client';
import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { ShareView } from '@/modules/2023';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next/types';

type Props = {
  artist: PublicViewArtist;
};

const SharePage: NextPage<Props> = ({ artist }) => {
  return <ShareView artist={artist} />;
};

export default SharePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await coreClient.api.getArtists();

  const paths = artists.map((artist) => ({
    params: { slug: artist.slug }
  }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const artists = await coreClient.api.getArtists();
  const artist = artists.find((artist) => artist.slug === context.params?.slug);

  if (!artist) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      artist
    }
  };
};
