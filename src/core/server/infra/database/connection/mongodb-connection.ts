import { Db, Document, InsertOneResult, MongoClient } from 'mongodb';
import { ConnectionInterface } from './connection.interface';

type Props = {
  connectionUrl: string;
  dbName: string;
};

type InsertOneInput = {
  collectionName: string;
  document: any;
};

type CountDocumentInput = {
  collectionName: string;
  key: string;
  value: string;
};

export class MongoDbConnection implements ConnectionInterface<Db> {
  private connectionUrl: string;
  private dbName: string;
  private client: MongoClient | null;
  private db: Db | null;

  constructor(props: Props) {
    this.connectionUrl = props.connectionUrl;
    this.dbName = props.dbName;
    this.client = null;
    this.db = null;
  }

  async insertOne(input: InsertOneInput): Promise<InsertOneResult<Document>> {
    const db = await this.connect();
    const collection = db.collection(input.collectionName);
    return await collection.insertOne(input.document);
  }

  async countDocuments(input: CountDocumentInput): Promise<number> {
    const db = await this.connect();
    const collection = db.collection(input.collectionName);
    return collection.countDocuments({ [input.key]: input.value });
  }

  async estimatedDocumentCount(collectionName: string): Promise<number> {
    const db = await this.connect();
    const collection = db.collection(collectionName);
    return collection.estimatedDocumentCount();
  }

  async connect(): Promise<Db> {
    if (this.db) return this.db;
    this.client = await MongoClient.connect(this.connectionUrl);
    this.db = this.client.db(this.dbName);
    return this.db;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}
