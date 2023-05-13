import { GetResultUsecase } from "@/core/server/application/usecases/get-result/get-result.usecase";
import { MongoDbConnection } from "@/core/server/infra/database/connection/mongodb-connection";
import { VoteRepositoryMongodb } from "@/core/server/infra/database/repositories/vote-repository-mongodb";
import { SerializedArtist } from "@/core/shared/domain/entities/artist";
import { ResultView } from "@/modules/2023";
import { GetStaticProps, NextPage } from "next";


type Props = {
  result: SerializedArtist[];
};

const ResultPage: NextPage<Props> = ({ result }) => {
  return <ResultView result={result}/>
};

export default ResultPage;

export const getStaticProps: GetStaticProps = async () => {
  const { SM_MONGODB_URI, SM_MONGODB_DB_NAME, SM_REVALIDATE_RESULT } = process.env;
  if (!SM_MONGODB_URI || !SM_MONGODB_DB_NAME) { return { notFound: true } };
  
  const connection = new MongoDbConnection({ connectionUrl: SM_MONGODB_URI || '', dbName: SM_MONGODB_DB_NAME || '' }); //prettier-ignore
  const voteRepository = new VoteRepositoryMongodb({ connection });
  const getResultUsecase = new GetResultUsecase({ voteRepository });
  const getResult = await getResultUsecase.execute();

  if(getResult.isFailure()) {
    console.error('GET_RESULT_ERROR', getResult.value.message);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      result: getResult.value
    },
    revalidate: 60 * Number(SM_REVALIDATE_RESULT || 10)
  };
};
