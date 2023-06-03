import { Core } from './server';
import { VoteController } from './server/adapters/controllers/vote.controller';
import { VerifyRecaptchaService } from './server/application/service/verify-recaptcha.service';
import { AddVoteUsecase } from './server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from './server/application/usecases/get-result/get-result.usecase';
import { mongodbConnectionProps } from './server/infra/config/mongodb.connection.props';
import { redisConnectionAuditLogProps } from './server/infra/config/redis.connection.props';
import { MongoDbConnection } from './server/infra/database/connection/mongodb-connection';
import { RedisConnection } from './server/infra/database/connection/redis-connection';
import { VoteRepositoryAuditLogMongodb } from './server/infra/database/repositories/vote-repository-audit-log-mongodb';
import { VoteRepositoryAuditLogRedis } from './server/infra/database/repositories/vote-repository-audit-log-redis';
import { ExternalGateway } from './server/infra/gateways/external.gateway';
import { AxiosHttpClient } from './shared/drivers/http/axios-http-client';

// const kafkaConnection = KafkaConnection.getInstance(kafkaConnectionProps);
// const voteQueue = new VoteQueue({ connection: kafkaConnection });
// const redisCounterConnection = RedisConnection.getInstance(redisConnectionCounterProps); //prettier-ignore
// const voteRepositoryCounter = new VoteRepositoryCounterRedis({ connection: redisCounterConnection }); //prettier-ignore

const httpClient = new AxiosHttpClient();
const externalGateway = new ExternalGateway({ httpClient });
const verifyRecaptchaService = new VerifyRecaptchaService({ externalGateway });

const redisAuditLogConnection = RedisConnection.getInstance(redisConnectionAuditLogProps); //prettier-ignore
const voteRepositoryAuditLog01 = new VoteRepositoryAuditLogRedis({ connection: redisAuditLogConnection }); //prettier-ignore

const mongoDBConnection = new MongoDbConnection(mongodbConnectionProps);
const voteRepositoryAuditLog02 = new VoteRepositoryAuditLogMongodb({ connection: mongoDBConnection }); //prettier-ignore

const addVoteUseCase = new AddVoteUsecase({
  voteRepositoryAuditLog01,
  voteRepositoryAuditLog02
});

const getResultUsecase = new GetResultUsecase({
  voteRepositoryAuditLog: voteRepositoryAuditLog01
});

export const coreServer = new Core({
  voteController: new VoteController({ addVoteUseCase, getResultUsecase, verifyRecaptchaService }) //prettier-ignore
});
