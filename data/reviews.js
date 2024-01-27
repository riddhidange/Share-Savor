import { restaurants, users } from "../config/mongoCollections.js";
import helpers from "../helpers.js";
import { ObjectId } from "mongodb";

async function findReviewByUIDAndRestaurantID(userId, restaurantId) {
  // Access the restaurants collection
  const restaurantsCollection = await restaurants();

  // Use aggregation to find relevant reviews
  const reviews = await restaurantsCollection
    .aggregate([
      { $match: { _id: new ObjectId(restaurantId) } },
      { $unwind: "$reviews" },
      {
        $match: {
          "reviews.userId": userId,
        },
      },
      { $project: { review: "$reviews" } },
    ])
    .toArray();

  // Return the matching review(s)
  return reviews;
}
async function updateOverallRating(restaurantId) {
  // calculate overallRating and updating overallRating key
  const restaurantsCollection = await restaurants();
  const result = await restaurantsCollection
    .aggregate([
      { $match: { _id: new ObjectId(restaurantId) } },
      {
        $addFields: {
          averageRating: {
            $avg: "$reviews.rating",
          },
        },
      },
      {
        $set: {
          overallRating: { $ifNull: ["$averageRating", 0] },
        },
      },
      { $project: { reviews: 0 } }, // optional: exclude reviews from response
    ])
    .toArray();

  if (result.length > 0) {
    // Get the updated document
    const updatedDocument = result[0];

    // Update the document in the collection
    await restaurantsCollection.updateOne(
      { _id: new ObjectId(restaurantId) },
      { $set: { overallRating: updatedDocument.overallRating } }
    );
  }
}
const createReview = async (
  restaurantId,
  userId,
  review,
  rating,
  userName,
  lastName
) => {
  // check whether it is a valid restaurantId
  helpers.validObjectId(restaurantId);
  helpers.validObjectId(userId);
  helpers.validStringWithNumAndSpecialChar(review);
  helpers.checkRatingForReview(rating);

  // check whether the restuarant for which you want to add reviews exist or not
  let restaurantsCollection = await restaurants();
  let restaurant = await restaurantsCollection.findOne({
    _id: new ObjectId(restaurantId),
  });
  if (restaurant == null) throw "No restaurant with the given Id";

  // check whether the user exist or not
  const usersCollection = await users();
  let user = await usersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (user == null) throw "No user with the given Id";

  //   check whether the user has already given review for the restuarant
  const existingReview = await findReviewByUIDAndRestaurantID(
    userId,
    restaurantId
  );
  if (existingReview.length)
    throw "User has already given review for this restaurant";
  let uniqueId = new ObjectId();
  const newReview = {
    _id: uniqueId,
    userId: userId,
    userName: userName,
    lastName: lastName,
    review: review,
    reviewDate: helpers.date(),
    rating: rating,
  };

  let updatedInfo = await restaurantsCollection.updateOne(
    { _id: new ObjectId(restaurantId) },
    { $push: { reviews: newReview } }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "could not add review";
  }
  //// update the overallRating after insertion
  updateOverallRating(restaurantId);

  return newReview;
};

const getAllReviews = async (restaurantId) => {
  // check restaurantId
  helpers.validObjectId(restaurantId);

  const restaurantsCollection = await restaurants();
  let restaurant = await restaurantsCollection.findOne({
    _id: new ObjectId(restaurantId),
  });
  if (restaurant == null) throw "No restaurant with the given Id";
  const reviews = restaurant?.reviews;
  if (reviews) {
    for (let i of reviews) {
      i._id = i._id.toString();
    }
  }
  return reviews;
};

const deleteReview = async (restaurantId, userId) => {
  const restaurantsCollection = await restaurants();

  // Update the restaurant document to remove the review
  const updateResult = await restaurantsCollection.updateOne(
    { _id: new ObjectId(restaurantId) },
    { $pull: { reviews: { userId: userId } } }
  );

  if (updateResult.modifiedCount === 0) {
    throw `Error: You have not given any review to this restuarant`;
  }

  // update the overallRating after deletion
  updateOverallRating(restaurantId);

  return { message: "review succesfully deleted" };
};

export default {
  createReview: createReview,
  getAllReviews: getAllReviews,
  deleteReview: deleteReview,
};
