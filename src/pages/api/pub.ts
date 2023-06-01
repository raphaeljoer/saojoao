import { Kafka } from 'kafkajs';
import { NextApiHandler } from 'next';

const pub: NextApiHandler = async (req, res) => {
  const kafka = new Kafka({
    brokers: [`${process.env.SM_KAFKA_BROKER || ''}`],
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.SM_KAFKA_SASL_USERNAME || '',
      password: process.env.SM_KAFKA_SASL_PASSWORD || ''
    },
    ssl: true
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'votes',
    messages: [{ value: 'Hello KafkaJS user!' }]
  });

  await producer.disconnect();
};

export default pub;
