import { Core } from './server';
import { VoteController } from './server/adapters/controllers/vote.controller';
import { VerifyRecaptchaService } from './server/application/service/verify-recaptcha.service';
import { AddVoteUsecase } from './server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from './server/application/usecases/get-result/get-result.usecase';
import { mongodbConnectionProps } from './server/infra/config/mongodb.connection.props';
import { redisConnectionCounterProps } from './server/infra/config/redis.connection.props';
import { MongoDbConnection } from './server/infra/database/connection/mongodb-connection';
import { RedisConnection } from './server/infra/database/connection/redis-connection';
import { VoteRepositoryAuditLogMongodb } from './server/infra/database/repositories/vote-repository-audit-log-mongodb';
import { VoteRepositoryCounterRedis } from './server/infra/database/repositories/vote-repository-counter-redis';
import { ExternalGateway } from './server/infra/gateways/external.gateway';
import { AxiosHttpClient } from './shared/drivers/http/axios-http-client';

// const redisAuditLogConnection = RedisConnection.getInstance(redisConnectionAuditLogProps); //prettier-ignore
// const voteRepositoryAuditLog = new VoteRepositoryAuditLogRedis({ connection: redisAuditLogConnection }); //prettier-ignore

// const kafkaConnection = KafkaConnection.getInstance(kafkaConnectionProps);
// const voteQueue = new VoteQueue({ connection: kafkaConnection });

const httpClient = new AxiosHttpClient();
const externalGateway = new ExternalGateway({ httpClient });
const verifyRecaptchaService = new VerifyRecaptchaService({ externalGateway });

const redisCounterConnection = RedisConnection.getInstance(redisConnectionCounterProps); //prettier-ignore
const voteRepositoryCounter = new VoteRepositoryCounterRedis({ connection: redisCounterConnection }); //prettier-ignore

const mongoDBConnection = new MongoDbConnection(mongodbConnectionProps);
const voteRepositoryAuditLog = new VoteRepositoryAuditLogMongodb({ connection: mongoDBConnection }); //prettier-ignore

const addVoteUseCase = new AddVoteUsecase({
  voteRepositoryCounter,
  voteRepositoryAuditLog
});

const getResultUsecase = new GetResultUsecase({
  voteRepositoryCounter: voteRepositoryCounter
});

export const coreServer = new Core({
  voteController: new VoteController({ addVoteUseCase, getResultUsecase, verifyRecaptchaService }) //prettier-ignore
});
