import { ObjectId } from "mongodb";
import restaurants from "./restaurants.js";
import {
  users as usersRef,
  orders as ordersRef,
  restaurants as restaurantsRef,
} from "../config/mongoCollections.js";
import { dbConnection } from "../config/mongoConnection.js";

export const createOrder = async (payload) => {
  const ordersCollection = await ordersRef();
  const usersCollection = await usersRef();
  const restaurantsCollection = await restaurantsRef();

  let insertedInfo = await ordersCollection.insertOne(payload);

  if (insertedInfo?.insertedCount === 0)
    throw "Error: Could not create an order";

  const updatedUserInfo = await usersCollection.findOneAndUpdate(
    { _id: new ObjectId(payload?.userId) },
    { $push: { orders: payload } },
    { returnDocument: "after", projection: { password: 0 } }
  );

  if (!updatedUserInfo) throw "Error: Could not update user data";
  updatedUserInfo._id = updatedUserInfo._id.toString();

  let mealPackUpdateInfo;
  for (let meal of payload?.items) {
    mealPackUpdateInfo = await restaurantsCollection.updateOne(
      { _id: new ObjectId(payload.resId), "mealPacks.id": meal.id },
      { $inc: { "mealPacks.$.availableItems": -1 } }
    );
    if (!mealPackUpdateInfo?.modifiedCount)
      throw "Error: Could not update meal pack data";
  }

  return {
    ...payload,
    orderId: insertedInfo.insertedId.toString(),
    user: updatedUserInfo,
  };
};

// export const createOrder = async (payload) => {
//   const { client } = await dbConnection();
//   let session = await client.startSession();
//   let orderId;
//   try {
//     const transactionOptions = {
//       readPreference: "primary",
//       readConcern: { level: "local" },
//       writeConcern: { w: "majority" },
//     };

//     await session.withTransaction(async () => {
//       const ordersCollection = await ordersRef();
//       const usersCollection = await usersRef();
//       const restaurantsCollection = await restaurantsRef();

//       const insertedInfo = await ordersCollection.insertOne(payload, {
//         session,
//       });
//       if (insertedInfo.insertedCount === 0)
//         throw new Error("Could not create an order");

//       orderId = insertedInfo.insertedId.toString();

//       const updatedUserInfo = await usersCollection.findOneAndUpdate(
//         { _id: new ObjectId(payload.userId) },
//         { $push: { orders: payload } },
//         { session }
//       );
//       if (!updatedUserInfo) throw new Error("Could not update user data");

//       let mealPackUpdateInfo;
//       for (const meal of payload.items) {
//         mealPackUpdateInfo = await restaurantsCollection.updateOne(
//           { id: meal.resId, "mealPacks.id": meal.id },
//           { $inc: { "mealPacks.$.availableItems": -1 } },
//           { session }
//         );
//         if (!mealPackUpdateInfo.modifiedCount)
//           throw new Error(`Could not update meal pack data for ID ${meal.id}`);
//       }
//     }, transactionOptions);

//     return { ...payload, orderId };
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error processing order creation");
//   } finally {
//     await session.endSession();
//   }
// };

export const getOrderHistory = async (userId) => {
  const ordersCollection = await ordersRef();
  const usersCollection = await usersRef();
  const restaurantsCollection = await restaurantsRef();

  try {
    const data = await usersCollection.findOne({ _id: new ObjectId(userId) });
    const orders = data.orders;

    // Sort orders by order date (descending)
    const sortedOrders = orders.sort((a, b) => b.orderAt - a.orderAt);

    // Fetch restaurant data for each order
    const res_history = await Promise.all(
      sortedOrders.map(async (order) => {
        const restaurant = await restaurantsCollection.findOne({
          _id: new ObjectId(order.resId),
        });
        return {
          ...order,
          restaurant, // Attach restaurant data to the order object
        };
      })
    );

    return res_history;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error so that the caller can handle it if needed
  }
};
