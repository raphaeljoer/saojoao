import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { Vote } from '../../src/core/server/domain/entities/vote';
import { MissingParamsError } from '../../src/core/shared/errors/missing-params.error';

config({ path: '.env.test' });

describe('[value-object] Vote', () => {
  test('Should create a valid vote', async () => {
    const votedAt = new Date().toISOString();

    const vote = Vote.create({
      artistId: 'artistId',
      votedAt,
      ip: 'ip'
    });

    expect(vote.isSuccess()).toBe(true);
    expect(vote.isFailure()).toBe(false);
    expect(vote.value).toBeInstanceOf(Vote);

    if (vote.isFailure()) return;
    expect(vote.value.artistId).toBe('artistId');
    expect(vote.value.votedAt).toBe(votedAt);
    expect(vote.value.ip).toBe('ip');
  });

  test('Should not create a invalid vote', async () => {
    const votedAt = new Date().toISOString();

    const vote = Vote.create({
      artistId: '',
      votedAt,
      ip: 'ip'
    });

    expect(vote.isSuccess()).toBe(false);
    expect(vote.isFailure()).toBe(true);
    expect(vote.value).toBeInstanceOf(MissingParamsError);
  });
});
