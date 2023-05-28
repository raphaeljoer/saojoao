import { Core } from './server';
import { VoteController } from './server/adapters/controllers/vote.controller';
import { AddVoteUsecase } from './server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from './server/application/usecases/get-result/get-result.usecase';
import { MongoDbConnection } from './server/infra/database/connection/mongodb-connection';
import { VoteRepositoryMongodb } from './server/infra/database/repositories/vote-repository-mongodb';
import { ExternalGateway } from './server/infra/gateways/external.gateway';
import { VerifyRecaptchaService } from './server/application/service/verify-recaptcha.service';
import { AxiosHttpClient } from './shared/drivers/http/axios-http-client';

const { SM_MONGODB_URI, SM_MONGODB_DB_NAME } = process.env;

const httpClient = new AxiosHttpClient();
const externalGateway = new ExternalGateway({ httpClient });
const verifyRecaptchaService = new VerifyRecaptchaService({ externalGateway });

const connection = new MongoDbConnection({ connectionUrl: SM_MONGODB_URI || '', dbName: SM_MONGODB_DB_NAME || '' }); //prettier-ignore
const voteRepository = new VoteRepositoryMongodb({ connection });

const addVoteUseCase = new AddVoteUsecase({ voteRepository });
const getResultUsecase = new GetResultUsecase({ voteRepository });

export const coreServer = new Core({
  voteController: new VoteController({ addVoteUseCase, getResultUsecase, verifyRecaptchaService }) //prettier-ignore
});
