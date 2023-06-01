import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { VoteController } from '../../src/core/server/adapters/controllers/vote.controller';
import { VerifyRecaptchaService } from '../../src/core/server/application/service/verify-recaptcha.service';
import { AddVoteUsecase } from '../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from '../../src/core/server/application/usecases/get-result/get-result.usecase';
import { FakeExternalGateway } from '../fakes/fake-external-gateway';
import { FakeVoteQueue } from '../fakes/fake-vote-queue';
import { FakeVoteRepository } from '../fakes/fake-vote-repository';

config({ path: '.env.test' });

describe(
  '[controller] VoteController',
  () => {
    test('Should add a vote', async () => {
      const recaptchaProps = {
        action: 'add_vote',
        hostname: 'localhost',
        score: 0.9
      };

      const externalGateway = new FakeExternalGateway({ recaptchaProps });
      const voteRepositoryCounter = new FakeVoteRepository();
      const voteRepositoryAuditLog = new FakeVoteRepository();
      const voteQueue = new FakeVoteQueue();

      const getResultUsecase = new GetResultUsecase({
        voteRepositoryCounter
      });

      const addVoteUseCase = new AddVoteUsecase({
        voteRepositoryCounter,
        voteRepositoryAuditLog
      });

      const verifyRecaptchaService = new VerifyRecaptchaService({ externalGateway }); //prettier-ignore

      const voteController = new VoteController({
        addVoteUseCase,
        getResultUsecase,
        verifyRecaptchaService
      });

      const addVoteResult = await voteController.addVote({
        vote: {
          artistId: 'artistId',
          votedAt: new Date().toISOString(),
          ip: 'ip'
        },
        recaptchaTokenV2: 'validTokenV2',
        recaptchaTokenV3: 'validTokenV3'
      });

      expect(addVoteResult.isSuccess()).toBe(true);
      expect(addVoteResult.isFailure()).toBe(false);

      if (addVoteResult.isFailure()) {
        throw new Error('Vote is failure');
      }

      expect(addVoteResult.value.artistId).toBe('artistId');
      expect(addVoteResult.value.ip).toBe('ip');
    });

    test('Should not add a vote with invalid parameters', async () => {
      const recaptchaProps = {
        action: 'add_vote',
        hostname: 'localhost',
        score: 0.9
      };

      const voteRepositoryCounter = new FakeVoteRepository();
      const voteRepositoryAuditLog = new FakeVoteRepository();

      const getResultUsecase = new GetResultUsecase({
        voteRepositoryCounter
      });

      const voteQueue = new FakeVoteQueue();

      const addVoteUseCase = new AddVoteUsecase({
        voteRepositoryCounter,
        voteRepositoryAuditLog
      });

      const externalGateway = new FakeExternalGateway({ recaptchaProps });
      const verifyRecaptchaService = new VerifyRecaptchaService({ externalGateway }); //prettier-ignore

      const voteController = new VoteController({
        addVoteUseCase,
        getResultUsecase,
        verifyRecaptchaService
      });

      const addVoteResult = await voteController.addVote({
        vote: { artistId: '', votedAt: '01/01/2023', ip: 'ip' },
        recaptchaTokenV2: 'validTokenV2',
        recaptchaTokenV3: 'validTokenV3'
      });

      expect(addVoteResult.isSuccess()).toBe(false);
      expect(addVoteResult.isFailure()).toBe(true);
      expect(addVoteResult.value).toBeInstanceOf(Error);

      if (addVoteResult.isSuccess()) {
        throw new Error('Vote is success');
      }

      expect(addVoteResult.value.message).toBe(`Missing params: [vote.artistId] is required`); //prettier-ignore

      const vote02 = await voteController.addVote({
        vote: { artistId: 'artistId', votedAt: '01/01/2023', ip: 'ip' },
        recaptchaTokenV2: '',
        recaptchaTokenV3: 'validTokenV3'
      });

      expect(vote02.isSuccess()).toBe(false);
      expect(vote02.isFailure()).toBe(true);
      expect(vote02.value).toBeInstanceOf(Error);

      if (vote02.isSuccess()) {
        throw new Error('Vote is success');
      }

      expect(vote02.value.message).toBe(`Missing params: [recaptchaTokenV2] is required`); //prettier-ignore
    });
  },
  { timeout: 20000 }
);
