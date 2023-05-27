import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { VoteController } from '../../src/core/server/adapters/controllers/vote.controller';
import { AddVoteUsecase } from '../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { GetResultUsecase } from '../../src/core/server/application/usecases/get-result/get-result.usecase';
import { VerifyRecaptchaService } from '../../src/core/server/infra/service/verify-recaptcha.service';
import { Vote } from '../../src/core/shared/domain/value-objects/vote.value-object';
import { FakeExternalGateway } from '../fakes/fake-external-gateway';
import { FakeVoteRepository } from '../fakes/fake-vote-repository';

config({ path: '.env.local' });

describe('[controller] VoteController', () => {
  test('Should add a vote', async () => {
    const recaptchaProps = {
      action: 'add_vote',
      hostname: 'localhost',
      score: 0.9
    };

    const externalGateway = new FakeExternalGateway({ recaptchaProps });
    const voteRepository = new FakeVoteRepository();
    const getResultUsecase = new GetResultUsecase({ voteRepository });
    const addVoteUseCase = new AddVoteUsecase({ voteRepository });
    const authRecaptchaService = new VerifyRecaptchaService({
      externalGateway
    });

    const voteController = new VoteController({
      addVoteUseCase,
      getResultUsecase,
      verifyRecaptchaService: authRecaptchaService
    });

    const vote = await voteController.addVote({
      vote: { artistId: 'artistId', votedAt: '01/01/2023', ip: 'ip' },
      recaptchaTokenV2: 'validTokenV2',
      recaptchaTokenV3: 'validTokenV3'
    });

    expect(vote.isSuccess()).toBe(true);
    expect(vote.isFailure()).toBe(false);
    expect(vote.value).toBeInstanceOf(Vote);

    if (vote.isFailure()) {
      throw new Error('Vote is failure');
    }

    expect(vote.value.artistId).toBe('artistId');
    expect(vote.value.ip).toBe('ip');
  });

  test('Should not add a vote with invalid parameters', async () => {
    const recaptchaProps = {
      action: 'add_vote',
      hostname: 'localhost',
      score: 0.9
    };
    const voteRepository = new FakeVoteRepository();
    const getResultUsecase = new GetResultUsecase({ voteRepository });
    const addVoteUseCase = new AddVoteUsecase({ voteRepository });
    const externalGateway = new FakeExternalGateway({ recaptchaProps });
    const authRecaptchaService = new VerifyRecaptchaService({
      externalGateway
    });
    const voteController = new VoteController({
      addVoteUseCase,
      getResultUsecase,
      verifyRecaptchaService: authRecaptchaService
    });

    const vote = await voteController.addVote({
      vote: { artistId: '', votedAt: '01/01/2023', ip: 'ip' },
      recaptchaTokenV2: 'validTokenV2',
      recaptchaTokenV3: 'validTokenV3'
    });

    expect(vote.isSuccess()).toBe(false);
    expect(vote.isFailure()).toBe(true);
    expect(vote.value).toBeInstanceOf(Error);

    if (vote.isSuccess()) {
      throw new Error('Vote is success');
    }

    expect(vote.value.message).toBe(`Missing params: [vote.artistId] is required`); //prettier-ignore

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
});
