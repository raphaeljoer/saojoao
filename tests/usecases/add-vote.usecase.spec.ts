import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { AddVoteUsecase } from '../../src/core/server/application/usecases/add-vote/add-vote.usecase';
import { VoteDto } from '../../src/core/server/domain/dto/vote.dto.type';
import { FakeVoteRepositoryAuditLog } from '../fakes/fake-vote-repository-audit-log';

config({ path: '.env.test' });

describe('AddVoteUseCase', () => {
  test('Should add a new vote when recaptcha token is valid', async () => {
    const voteRepositoryAuditLog01 = new FakeVoteRepositoryAuditLog();
    const voteRepositoryAuditLog02 = new FakeVoteRepositoryAuditLog();

    const addVoteUseCase = new AddVoteUsecase({
      voteRepositoryAuditLog01,
      voteRepositoryAuditLog02
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

    const voteRepositoryAuditLog01Response01 = await voteRepositoryAuditLog01.countById(vote.artistId); //prettier-ignore
    const voteRepositoryAuditLog01Response02 = await voteRepositoryAuditLog01.countById(vote.artistId); //prettier-ignore

    if (voteRepositoryAuditLog01Response01.isFailure()) {
      throw voteRepositoryAuditLog01Response01.value;
    }

    expect(voteRepositoryAuditLog01Response01.value).toBe(1);

    if (voteRepositoryAuditLog01Response02.isFailure()) {
      throw voteRepositoryAuditLog01Response02.value;
    }

    expect(voteRepositoryAuditLog01Response02.value).toBe(1);
  });

  test('Should return an error when missing some param', async () => {
    const vote: VoteDto = {
      artistId: '',
      votedAt: '01/01/2023',
      ip: 'ip'
    };

    const voteRepositoryAuditLog01 = new FakeVoteRepositoryAuditLog();
    const voteRepositoryAuditLog02 = new FakeVoteRepositoryAuditLog();

    const addVoteUseCase = new AddVoteUsecase({
      voteRepositoryAuditLog01,
      voteRepositoryAuditLog02
    });

    const result = await addVoteUseCase.execute(vote);

    expect(result.isFailure()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);

    const voteRepositoryAuditLog01Response01 = await voteRepositoryAuditLog01.countById(vote.artistId); //prettier-ignore
    const voteRepositoryAuditLog01Response02 = await voteRepositoryAuditLog01.countById(vote.artistId); //prettier-ignore

    if (voteRepositoryAuditLog01Response01.isFailure()) {
      throw voteRepositoryAuditLog01Response01.value;
    }

    expect(voteRepositoryAuditLog01Response01.value).toBe(0);

    if (voteRepositoryAuditLog01Response02.isFailure()) {
      throw voteRepositoryAuditLog01Response02.value;
    }

    expect(voteRepositoryAuditLog01Response02.value).toBe(0);
  });
});
