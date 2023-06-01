import { fail, success } from '@/core/shared/errors/either';
import {
  QueueConnectionInterface,
  SendMessageOutput
} from './kafka.connection.queue';
import { PubInput, QueueInterface } from './queue.interface';

type Props = {
  connection: QueueConnectionInterface;
};

export type VoteQueueInterface = QueueInterface<SendMessageOutput>;

export class VoteQueue implements VoteQueueInterface {
  private readonly connection: QueueConnectionInterface;
  private readonly topic: string;

  constructor(props: Props) {
    this.connection = props.connection;
    this.topic = 'votes';
  }

  async pub(input: PubInput): Promise<SendMessageOutput> {
    console.time('[VoteQueue].pub');

    const result = await this.connection.sendMessage({
      topic: this.topic,
      message: input.message
    });

    if (result.isFailure()) {
      return fail(result.value);
    }

    console.timeEnd('[VoteQueue].pub');
    return success(result.value);
  }
}
