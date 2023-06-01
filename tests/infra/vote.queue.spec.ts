import { config } from 'dotenv';
import { describe, test } from 'vitest';

config({ path: '.env.test' });

describe(
  '[infra] VoteQueue',
  () => {
    test('Should add a vote', async () => {});
  },
  { timeout: 20000 }
);
