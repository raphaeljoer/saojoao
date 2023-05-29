import { coreServer } from '@/core/main-server';
import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { ResultView } from '@/modules/2023';
import { GetStaticProps, NextPage } from 'next';

type Props = {
  artists: SerializedArtist[];
};

const ResultPage: NextPage<Props> = ({ artists }) => {
  return <ResultView result={artists} />;
};

export default ResultPage;

export const getStaticProps: GetStaticProps = async () => {
  const result = await coreServer.vote.getResult();

  if (result.isFailure()) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      artists: result.value
    },
    revalidate: 60 * Number(process.env.SM_REVALIDATE_RESULT || 10)
  };
};
