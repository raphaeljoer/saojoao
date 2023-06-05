import { GetPublicResultPresenter } from '@/core/server/adapters/presenter/result/get-public-result.presenter';
import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { GetResultUsecase } from '../../src/core/server/application/usecases/get-result/get-result.usecase';
import { Vote } from '../../src/core/server/domain/entities/vote';
import { artistProps } from '../../src/core/shared/data/artists';
import { FakeVoteRepositoryAuditLog } from '../fakes/fake-vote-repository-audit-log';

config({ path: '.env.test' });

describe('GetResultUseCase', () => {
  test('Should get the results', async () => {
    const voteRepositoryAuditLog = new FakeVoteRepositoryAuditLog();

    const vote01 = Vote.create({
      artistId: artistProps[0].artistId,
      votedAt: new Date().toISOString(),
      ip: 'fake-ip'
    });

    if (vote01.isFailure()) {
      throw new Error('Vote01 is failure');
    }

    voteRepositoryAuditLog.add(vote01.value);
    voteRepositoryAuditLog.add(vote01.value);

    const vote02 = Vote.create({
      artistId: artistProps[1].artistId,
      votedAt: new Date().toISOString(),
      ip: 'fake-ip'
    });

    if (vote02.isFailure()) {
      throw new Error('Vote02 is failure');
    }

    voteRepositoryAuditLog.add(vote02.value);

    const vote03 = Vote.create({
      artistId: artistProps[1].artistId,
      votedAt: new Date().toISOString(),
      ip: 'fake-ip'
    });

    if (vote03.isFailure()) {
      throw new Error('Vote02 is failure');
    }

    voteRepositoryAuditLog.add(vote03.value);

    const getResultUseCase = new GetResultUsecase({
      voteRepositoryAuditLog: voteRepositoryAuditLog
    });

    const presenter = new GetPublicResultPresenter();
    const result = await getResultUseCase.execute({ presenter });

    expect(result.isSuccess()).toBe(true);
    expect(result.isFailure()).toBe(false);

    if (result.isFailure()) {
      throw new Error('Result is failure');
    }

    expect(result.value).toBeDefined();
    expect(result.value[0].artistId).toBe(artistProps[0].artistId);
    expect(result.value[0].name).toBe(artistProps[0].name);
    expect(result.value[0].position).toBe(1);
  });
});
