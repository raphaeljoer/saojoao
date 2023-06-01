import { KafkaConnectionProps } from '../queue/kafka.connection.queue';

export const kafkaConnectionProps: KafkaConnectionProps = {
  brokers: [process.env.SM_KAFKA_BROKER || ''],
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.SM_KAFKA_SASL_USERNAME || '',
    password: process.env.SM_KAFKA_SASL_PASSWORD || ''
  },
  ssl: true
};
