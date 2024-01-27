import resData from "./data/NJData.json" assert { type: "json" };
import { closeConnection, dbConnection } from "./config/mongoConnection.js";
import {
  restaurants as resRef,
  users as usersRef,
} from "./config/mongoCollections.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const users = [
  {
    firstName: "Dhruv",
    lastName: "Vaghela",
    gender: "male",
    dateOfBirth: "02/04/1997",
    university: "stevens",
    email: "dhruv@stevens.edu",
    password: await bcrypt.hash("Dhruv@123", saltRounds),
    orders: [],
    createdAt: new Date().toISOString(),
  },
  {
    firstName: "Yuvaraj",
    lastName: "Nagi",
    gender: "male",
    dateOfBirth: "06/30/1997",
    university: "stevens",
    email: "ynagi@stevens.edu",
    password: await bcrypt.hash("test@1234", saltRounds),
    orders: [],
    createdAt: new Date().toISOString(),
  },
];

const seed = async () => {
  // Your code to seed the database goes here
  const { db } = await dbConnection();
  db.dropDatabase();

  let resCollection = await resRef();
  let insertInfo = await resCollection.insertMany(resData);
  if (insertInfo.insertedCount === 0) throw "Could not add restaurants";

  let usersCollection = await usersRef();
  let insertUsers = await usersCollection.insertMany(users);

  if (insertUsers.insertedCount === 0) throw "Could not add users";

  console.log(`Done seeding database with ${resData.length} restaurants`);

  closeConnection();
};

await seed();

export default seed;
