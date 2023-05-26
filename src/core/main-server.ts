import { Core } from './core-server';
import { VoteController } from './server/adapters/controllers/vote.controller';
import { GoogleRecaptchaGateway } from './server/adapters/gateways/google-recaptcha.gateway';
import { AddVoteUsecase } from './server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from './server/application/usecases/get-result/get-result.usecase';
import { MongoDbConnection } from './server/infra/database/connection/mongodb-connection';
import { VoteRepositoryMongodb } from './server/infra/database/repositories/vote-repository-mongodb';
import { AxiosHttpClient } from './shared/drivers/http/axios-http-client';

const { SM_MONGODB_URI, SM_MONGODB_DB_NAME } = process.env;

const httpClient = new AxiosHttpClient();
const connection = new MongoDbConnection({
  connectionUrl: SM_MONGODB_URI || '',
  dbName: SM_MONGODB_DB_NAME || ''
});
const recaptchaGateway = new GoogleRecaptchaGateway({ httpClient });
const voteRepository = new VoteRepositoryMongodb({ connection });

const addVoteUseCase = new AddVoteUsecase({ voteRepository, recaptchaGateway });
const getResultUsecase = new GetResultUsecase({ voteRepository });

export const coreServer = new Core({
  voteController: new VoteController({ addVoteUseCase, getResultUsecase })
});
