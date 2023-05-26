import { GetResultUsecase } from '@/core/server/application/usecases/get-result/get-result.usecase';
import { MongoDbConnection } from '@/core/server/infra/database/connection/mongodb-connection';
import { VoteRepositoryMongodb } from '@/core/server/infra/database/repositories/vote-repository-mongodb';
import { SerializedArtist } from '@/core/shared/domain/entities/artist';
import { WinnerView } from '@/modules/2023/features/winner/views/WinnerView';
import { Switcher } from '@/modules/shared/components/Switcher';
import { GetStaticProps, NextPage } from 'next';
import PerksPage from '../perks';
import ResultPage from '../result';

type Props = {
  artists: SerializedArtist[];
};

const WinnerPage: NextPage<Props> = ({ artists }) => {
  const startDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_START || '');
  const endDate = new Date(process.env.NEXT_PUBLIC_VOTING_DATE_END || '');

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
  const { SM_MONGODB_URI, SM_MONGODB_DB_NAME, SM_REVALIDATE_RESULT } =
    process.env;
  if (!SM_MONGODB_URI || !SM_MONGODB_DB_NAME) {
    return { notFound: true };
  }

  const connection = new MongoDbConnection({ connectionUrl: SM_MONGODB_URI || '', dbName: SM_MONGODB_DB_NAME || '' }); //prettier-ignore
  const voteRepository = new VoteRepositoryMongodb({ connection });
  const getResultUsecase = new GetResultUsecase({ voteRepository });
  const getResult = await getResultUsecase.execute();

  if (getResult.isFailure()) {
    console.error('GET_RESULT_ERROR', getResult.value.error);
    return {
      notFound: true
    };
  }

  return {
    props: {
      artists: getResult.value
    },
    revalidate: 60 * Number(SM_REVALIDATE_RESULT || 10)
  };
};
