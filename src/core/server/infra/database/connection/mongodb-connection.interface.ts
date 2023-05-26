import { Db } from 'mongodb';
import { ConnectionInterface } from './connection.interface';

type InsertOneInput = {
  collectionName: string;
  document: any;
};

type CountDocumentInput = {
  collectionName: string;
  key: string;
  value: string;
};

export interface MongoDbConnectionInterface extends ConnectionInterface<Db> {
  insertOne(input: InsertOneInput): Promise<any>;
  estimatedDocumentCount(collectionName: string): Promise<number>;
  countDocuments(input: CountDocumentInput): Promise<number>;
  connect(): Promise<Db>;
  disconnect(): Promise<void>;
}
