import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js";

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }

  return { db: _db, client: _connection };
};

const closeConnection = async () => {
  await _connection.close();
  console.log("MongoDB connection closed");
};

export { dbConnection, closeConnection };
