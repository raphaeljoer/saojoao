import { Either, fail, success } from '@/core/shared/errors/either';
import { Consumer, Kafka, RecordMetadata } from 'kafkajs';
import { CouldNotConnectError } from '../errors/could-not-connect.error';
import {
  PubInput,
  QueueConnectionInterface,
  SubInput
} from './queue.connection.interface';

type SaslType = {
  mechanism: 'scram-sha-256';
  username: string;
  password: string;
};

export type KafkaConnectionProps = {
  brokers: string[];
  sasl: SaslType;
  ssl: boolean;
};

export type PubOutput = Either<CouldNotConnectError, RecordMetadata[]>;
export type SubOutput = Either<CouldNotConnectError, Consumer>;
export type KafkaConnectionInterface = QueueConnectionInterface<
  PubOutput,
  SubOutput
>;

export class KafkaConnection implements KafkaConnectionInterface {
  public static instance: KafkaConnection;
  private readonly kafkaInstance: Kafka;

  private constructor(props: KafkaConnectionProps) {
    console.log('[KafkaConnection] Creating instance');
    this.kafkaInstance = new Kafka(props);
  }

  public static getInstance(props: KafkaConnectionProps): KafkaConnection {
    if (!KafkaConnection.instance) {
      KafkaConnection.instance = new KafkaConnection(props);
    }
    return KafkaConnection.instance;
  }

  async pub(input: PubInput): Promise<PubOutput> {
    console.time('[KafkaConnection].sendMessage');
    const producer = this.kafkaInstance.producer();

    try {
      await producer.connect();
    } catch (error) {
      return fail(new CouldNotConnectError('Não foi possível conectar ao Kafka producer')); //prettier-ignore
    }

    const recordMetaData = await producer.send({
      topic: input.topic,
      messages: [{ value: input.message }]
    });

    console.timeEnd('[KafkaConnection].sendMessage');
    return success(recordMetaData);
  }

  async sub(input: SubInput): Promise<SubOutput> {
    const consumer = this.kafkaInstance.consumer({
      groupId: 'talento_saojoao_2023_cluster'
    });

    try {
      await consumer.connect();
    } catch (error) {
      return fail(new CouldNotConnectError('Não foi possível conectar ao Kafka consumer')); //prettier-ignore
    }

    await consumer.subscribe({
      topic: input.topic,
      fromBeginning: input.fromBeginning
    });

    return success(consumer);
  }
}
