import assert from "assert";
import { test } from "vitest";
import { MongoDbConnection } from './../../src/core/server/infra/database/connection/mongodb-connection';


test("MongoDbConnection", async () => {
  const connection = new MongoDbConnection({ 
    connectionUrl: 'mongodb+srv://talentosaojoao:VeDkL8pOoJguY44Y@cluster0.rscwy.mongodb.net/?retryWrites=true&w=majority' || '', 
    dbName: 'saojoao2023' || '' 
  });
  
  const result = await connection.insertOne({
    collectionName: 'votes',
    document: {
      id: '123',
      voted_at: new Date().toISOString(),
      ip: '321'
  }});

  console.log(result); 

  assert.strictEqual(1, 1);
}, { timeout: 20000 });