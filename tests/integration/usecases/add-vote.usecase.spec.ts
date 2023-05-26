import assert from 'assert';
import { describe, test } from 'vitest';
import { AddVoteUsecase } from '../../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { VoteDTO } from '../../../src/core/server/domain/dto/vote.dto.type';
import { FakeRecaptchaGateway } from '../../fakes/fake-google-recaptcha';
import { FakeVoteRepository } from '../../fakes/fake-vote-repository';

describe('AddVoteUseCase', () => {
  test('Should add a new vote when recaptcha token is valid', async () => {
    const recaptchaTokenV2 = 'validTokenV2';
    const recaptchaTokenV3 = 'validTokenV3';
    const vote: VoteDTO = {
      artistId: 'artistId',
      votedAt: '01/01/2023',
      ip: 'ip'
    };

    const voteRepository = new FakeVoteRepository();
    const recaptchaGateway = new FakeRecaptchaGateway('add_vote');
    const addVoteUseCase = new AddVoteUsecase({
      voteRepository,
      recaptchaGateway
    });

    await addVoteUseCase.execute({
      vote,
      recaptchaTokenV2,
      recaptchaTokenV3
    });

    const votes = await voteRepository.countVotes({
      key: 'artistId',
      value: vote.artistId
    });
    assert.strictEqual(votes, 1);
  });

  test('Should throw an error when recaptcha token is invalid', async () => {
    const vote: VoteDTO = {
      artistId: 'artistId',
      votedAt: '01/01/2023',
      ip: 'ip'
    };

    const voteRepository = new FakeVoteRepository();
    const recaptchaGateway = new FakeRecaptchaGateway('add_vote');
    const addVoteUseCase = new AddVoteUsecase({
      voteRepository,
      recaptchaGateway
    });

    const result01 = await addVoteUseCase.execute({
      vote,
      recaptchaTokenV2: 'invalidTokenV2',
      recaptchaTokenV3: 'validTokenV3'
    });
    assert.strictEqual(result01.isFailure(), true);

    const total01 = await voteRepository.countVotesTotal();
    assert.strictEqual(total01, 0);

    const result02 = await addVoteUseCase.execute({
      vote,
      recaptchaTokenV2: 'validTokenV2',
      recaptchaTokenV3: 'invalidTokenV3'
    });
    assert.strictEqual(result02.isFailure(), true);

    const total02 = await voteRepository.countVotesTotal();
    assert.strictEqual(total02, 0);
  });
});
