import { Either, fail, success } from '@/core/shared/errors/either';
import { Kafka, Producer, RecordMetadata } from 'kafkajs';
import { CouldNotConnectError } from '../errors/could-not-connect.error';

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

export type SendMessageInput = {
  topic: string;
  message: string;
};

export type ConnectOutput = Either<CouldNotConnectError, Producer>;
export type SendMessageOutput = Either<CouldNotConnectError, RecordMetadata[]>;

export interface QueueConnectionInterface {
  sendMessage(input: SendMessageInput): Promise<SendMessageOutput>;
}

export class KafkaConnection {
  private brokers: string[];
  private readonly sasl: SaslType;
  private readonly ssl: boolean;
  private producerPool: Producer[];

  constructor(props: KafkaConnectionProps) {
    this.brokers = props.brokers;
    this.sasl = props.sasl;
    this.ssl = props.ssl;
    this.producerPool = [];
    console.log('[KafkaConnection] Creating instance');
  }

  async sendMessage(input: SendMessageInput): Promise<SendMessageOutput> {
    console.time('[KafkaConnection].sendMessage');
    const producer = await this.getProducer();

    if (producer.isFailure()) {
      return fail(producer.value);
    }

    const recordMetaData = await producer.value.send({
      topic: input.topic,
      messages: [{ value: input.message }]
    });

    console.timeEnd('[KafkaConnection].sendMessage');
    return success(recordMetaData);
  }

  async connect(): Promise<ConnectOutput> {
    const producer = await this.createProducer();

    if (producer.isFailure()) {
      return fail(producer.value);
    }

    this.producerPool.push(producer.value);
    return success(producer.value);
  }

  async disconnect(): Promise<void> {
    for (const producer of this.producerPool) {
      await producer.disconnect();
    }
    this.producerPool = [];
  }

  private async getProducer(): Promise<ConnectOutput> {
    if (this.producerPool.length > 0) {
      console.log('[KafkaConnection].getProducer: reusing existing producer');
      return success(this.producerPool[0]);
    }
    const result = await this.createProducer();

    if (result.isFailure()) {
      return fail(result.value);
    }

    return success(result.value);
  }

  private async createProducer(): Promise<ConnectOutput> {
    console.time('[KafkaConnection].createProducer');
    const kafka = new Kafka({
      brokers: this.brokers,
      sasl: this.sasl,
      ssl: this.ssl
    });
    const producer = kafka.producer();
    try {
      await producer.connect();
    } catch (error) {
      return fail(new CouldNotConnectError('Não foi possível conectar ao Kafka')); //prettier-ignore
    }
    this.producerPool.push(producer);
    console.timeEnd('[KafkaConnection].createProducer');
    return success(producer);
  }
}
