import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { AddVoteUsecase } from '../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { VoteDto } from '../../src/core/server/domain/dto/vote.dto.type';
import { FakeVoteQueue } from '../fakes/fake-vote-queue';
import { FakeVoteRepository } from '../fakes/fake-vote-repository';

config({ path: '.env.test' });

describe('AddVoteUseCase', () => {
  test('Should add a new vote when recaptcha token is valid', async () => {
    const voteRepositoryAuditLog = new FakeVoteRepository();
    const voteRepositoryCounter = new FakeVoteRepository();
    const voteQueue = new FakeVoteQueue();

    const addVoteUseCase = new AddVoteUsecase({
      voteRepositoryAuditLog,
      voteRepositoryCounter,
      voteQueue
    });

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

    const countVotes = await voteRepositoryCounter.countById(vote.artistId);

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

    const voteRepositoryAuditLog = new FakeVoteRepository();
    const voteRepositoryCounter = new FakeVoteRepository();
    const voteQueue = new FakeVoteQueue();

    const addVoteUseCase = new AddVoteUsecase({
      voteRepositoryAuditLog,
      voteRepositoryCounter,
      voteQueue
    });

    const result = await addVoteUseCase.execute(vote);

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);

    const countVotesTotal = await voteRepositoryCounter.countTotal();

    if (countVotesTotal.isFailure()) {
      throw countVotesTotal.value;
    }

    expect(countVotesTotal.value).toBe(0);
  });
});
