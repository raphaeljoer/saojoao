import { coreServer } from '@/core/main-server';
import { PublicViewArtist } from '@/core/server/domain/entities/artist';
import { WinnerView } from '@/modules/2023/features/winner/views/WinnerView';
import { GetStaticProps, NextPage } from 'next';

type Props = {
  result: PublicViewArtist[];
};

const WinnerPage: NextPage<Props> = ({ result }) => {
  return <WinnerView artists={result} />;
};

export default WinnerPage;

export const getStaticProps: GetStaticProps = async () => {
  const result = await coreServer.vote.auditVotes();

  if (result.isFailure()) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      result: result.value
    },
    revalidate: 60 * Number(process.env.SM_REVALIDATE_RESULT || 10)
  };
};
