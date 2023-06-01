import { VoteQueueInterface } from '@/core/server/infra/queue/vote.queue';
import { RecordMetadata } from 'kafkajs';
import { CouldNotConnectError } from './../../src/core/server/infra/errors/could-not-connect.error';
import { SendMessageOutput } from './../../src/core/server/infra/queue/kafka.connection.queue';
import {
  PubInput,
  QueueInterface
} from './../../src/core/server/infra/queue/queue.interface';
import { fail, success } from './../../src/core/shared/errors/either';

export type FakeVoteQueueInterface = QueueInterface<SendMessageOutput>;

export class FakeVoteQueue implements VoteQueueInterface {
  private readonly topic: string;
  private readonly messages!: string[];

  constructor() {
    this.topic = 'votes';
    this.messages = [];
  }

  async pub(input: PubInput): Promise<SendMessageOutput> {
    try {
      this.messages.push(input.message);
      return success({} as RecordMetadata[]);
    } catch (error) {
      return fail(new CouldNotConnectError('fake'));
    }
  }
}
