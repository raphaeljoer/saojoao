import { VoteQueueInterface } from '@/core/server/infra/queue/vote.queue';
import { RecordMetadata } from 'kafkajs';
import { PubInput } from '../../src/core/server/infra/queue/queue.connection.interface';
import { CouldNotConnectError } from './../../src/core/server/infra/errors/could-not-connect.error';
import { fail, success } from './../../src/core/shared/errors/either';

export class FakeVoteQueue implements VoteQueueInterface {
  private readonly messages!: string[];

  constructor() {
    this.messages = [];
  }

  async pub(input: PubInput): Promise<any> {
    try {
      this.messages.push(input.message);
      return success({} as RecordMetadata[]);
    } catch (error) {
      return fail(new CouldNotConnectError('fake'));
    }
  }

  async sub(): Promise<any> {
    return success({} as any);
  }
}
