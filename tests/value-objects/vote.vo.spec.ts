import { config } from 'dotenv';
import { describe, expect, test } from 'vitest';
import { Vote } from '../../src/core/server/domain/value-objects/vote.value-object';

config({ path: '.env.test' });

describe('[value-object] Vote', () => {
  test('Should create a valid vote', async () => {
    const vote = Vote.create({
      artistId: 'artistId',
      votedAt: '01/01/2023',
      ip: 'ip'
    });

    expect(vote.isSuccess()).toBe(true);
    expect(vote.isFailure()).toBe(false);
    expect(vote.value).toBeInstanceOf(Vote);

    if (vote.isFailure()) return;
    expect(vote.value.artistId).toBe('artistId');
    expect(vote.value.votedAt).toBe('01/01/2023');
    expect(vote.value.ip).toBe('ip');
  });

  test('Should not create a invalid vote', async () => {
    const vote = Vote.create({
      artistId: 'artistId',
      votedAt: '01/01/2023',
      ip: 'ip'
    });

    expect(vote.isSuccess()).toBe(true);
    expect(vote.isFailure()).toBe(false);
    expect(vote.value).toBeInstanceOf(Vote);

    if (vote.isFailure()) return;
    expect(vote.value.artistId).toBe('artistId');
    expect(vote.value.votedAt).toBe('01/01/2023');
    expect(vote.value.ip).toBe('ip');
  });
});
