import { coreServer } from '@/core/main-server';
import { SerializedArtist } from '@/core/server/domain/entities/artist';
import { Switcher } from '@/modules/shared/components/Switcher';
import { GetStaticProps, NextPage } from 'next';
import PerksPage from './perks';
import VotePage from './vote';
import WinnerPage from './winner';

type Props = {
  result: SerializedArtist[];
};

const HomePage: NextPage<Props> = ({ result }) => {
  const votingStartDate = new Date(process.env.VOTING_DATE_START || '');
  const votingEndDate = new Date(process.env.VOTING_DATE_END || '');
  const releaseWinnerDate = new Date(process.env.VOTING_RELEASE_WINNER_DATE || ''); //prettier-ignore

  return (
    <Switcher
      votingStartDate={votingStartDate}
      votingEndDate={votingEndDate}
      releaseWinnerDate={releaseWinnerDate}
      onIdle={<PerksPage />}
      onVotingStart={<VotePage />}
      onVotingEnd={<PerksPage />}
      onReleaseWinner={<WinnerPage result={result} />}
    />
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const result = await coreServer.vote.getResult();

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
