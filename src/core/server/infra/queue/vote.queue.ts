import { fail, success } from '@/core/shared/errors/either';
import { KafkaConnectionInterface } from './kafka.connection.queue';
import { PubInput, SubInput } from './queue.connection.interface';

export interface VoteQueueInterface {
  pub(input: PubInput): Promise<void>;
  sub(input?: SubInput): Promise<void>;
}

type Props = {
  connection: KafkaConnectionInterface;
};
export class VoteQueue {
  private readonly connection: KafkaConnectionInterface;
  private readonly topic: string;

  constructor(props: Props) {
    this.connection = props.connection;
    this.topic = 'votes';
  }

  async pub(input: PubInput) {
    console.time('[VoteQueue].pub');

    const result = await this.connection.pub({
      topic: this.topic,
      message: input.message
    });

    if (result.isFailure()) {
      return fail(result.value);
    }

    console.timeEnd('[VoteQueue].pub');
    return success(result.value);
  }

  async sub() {
    console.time('[VoteQueue].sub');

    const result = await this.connection.sub({
      topic: this.topic,
      fromBeginning: true
    });

    if (result.isFailure()) {
      return fail(result.value);
    }

    console.timeEnd('[VoteQueue].sub');
    return success(result.value);
  }
}
