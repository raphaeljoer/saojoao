import { Db, Document, InsertOneResult, MongoClient } from 'mongodb';

export type MongoDbConnectionProps = {
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

export class MongoDbConnection {
  private connectionUrl: string;
  private dbName: string;
  private client: MongoClient | null;
  private db: Db | null;

  constructor(props: MongoDbConnectionProps) {
    this.connectionUrl = props.connectionUrl;
    this.dbName = props.dbName;
    this.client = null;
    this.db = null;
  }

  async insertOne(input: InsertOneInput): Promise<InsertOneResult<Document>> {
    const db = await this.connect();
    console.time('[MongoDbConnection].insertOne');
    const collection = db.collection(input.collectionName);
    const result = await collection.insertOne(input.document);
    console.timeEnd('[MongoDbConnection].insertOne');
    return result;
  }

  async countDocuments(input: CountDocumentInput): Promise<number> {
    const db = await this.connect();
    console.time('[MongoDbConnection].countDocuments');
    const collection = db.collection(input.collectionName);
    const count = await collection.countDocuments({ [input.key]: input.value });
    console.timeEnd('[MongoDbConnection].countDocuments');
    return count;
  }

  async estimatedDocumentCount(collectionName: string): Promise<number> {
    const db = await this.connect();
    console.time('[MongoDbConnection].estimatedDocumentCount');
    const collection = db.collection(collectionName);
    const estimatedDocumentCount = await collection.estimatedDocumentCount();
    console.timeEnd('[MongoDbConnection].estimatedDocumentCount');
    return estimatedDocumentCount;
  }

  async connect(): Promise<Db> {
    if (this.db) {
      console.log('[MongoDbConnection].connect: db already connected');
      return this.db;
    }
    console.time('[MongoDbConnection].connect');
    this.client = await MongoClient.connect(this.connectionUrl);
    console.timeEnd('[MongoDbConnection].connect');
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
