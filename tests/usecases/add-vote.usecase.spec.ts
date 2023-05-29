import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { AddVoteUsecase } from '../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { VoteDto } from '../../src/core/server/domain/dto/vote.dto.type';
import { FakeVoteRepository } from '../fakes/fake-vote-repository';

config({ path: '.env.test' });

describe('AddVoteUseCase', () => {
  test('Should add a new vote when recaptcha token is valid', async () => {
    const voteRepository = new FakeVoteRepository();
    const addVoteUseCase = new AddVoteUsecase({ voteRepository });

    const vote: VoteDto = {
      artistId: 'artistId',
      votedAt: new Date().toISOString(),
      ip: 'ip'
    };

    const result = await addVoteUseCase.execute(vote);

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toEqual(vote);

    if (result.isFailure()) {
      throw result.value;
    }

    expect(result.value.artistId).toBe(vote.artistId);
    expect(result.value.votedAt).toBe(vote.votedAt);
    expect(result.value.ip).toBe(vote.ip);

    const countVotes = await voteRepository.countVotes({
      key: 'artistId',
      value: vote.artistId
    });

    if (countVotes.isFailure()) {
      throw countVotes.value;
    }

    expect(countVotes.value).toBe(1);
  });

  test('Should return an error when missing some param', async () => {
    const vote: VoteDto = {
      artistId: '',
      votedAt: '01/01/2023',
      ip: 'ip'
    };

    const voteRepository = new FakeVoteRepository();
    const addVoteUseCase = new AddVoteUsecase({ voteRepository });

    const result = await addVoteUseCase.execute(vote);

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);

    const countVotesTotal = await voteRepository.countVotesTotal();

    if (countVotesTotal.isFailure()) {
      throw countVotesTotal.value;
    }

    expect(countVotesTotal.value).toBe(0);
  });
});
