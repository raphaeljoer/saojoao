export const mongodbConnectionProps = {
  connectionUrl: process.env.SM_MONGODB_URI || '',
  dbName: process.env.SM_MONGODB_DB_NAME || ''
};
