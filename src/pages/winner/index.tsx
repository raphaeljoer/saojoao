import { coreServer } from '@/core/main-server';
import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { WinnerView } from '@/modules/2023/features/winner/views/WinnerView';
import { Switcher } from '@/modules/shared/components/Switcher';
import { GetStaticProps, NextPage } from 'next';
import PerksPage from '../perks';
import ResultPage from '../result';

type Props = {
  artists: SerializedArtist[];
};

const WinnerPage: NextPage<Props> = ({ artists }) => {
  const startDate = new Date(process.env.VOTING_DATE_START || '');
  const endDate = new Date(process.env.VOTING_DATE_END || '');

  return (
    <Switcher
      startDate={startDate}
      endDate={endDate}
      onIdle={<PerksPage />}
      onStart={<ResultPage artists={artists} />}
      onEnd={<WinnerView artists={artists} />}
    />
  );
};

export default WinnerPage;

export const getStaticProps: GetStaticProps = async () => {
  const { SM_REVALIDATE_RESULT } = process.env;
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
    revalidate: 60 * Number(SM_REVALIDATE_RESULT || 10)
  };
};
