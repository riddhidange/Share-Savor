import { restaurants } from "../config/mongoCollections.js";
import helpers from "../helpers.js";
import { ObjectId } from "mongodb";

const createRestaurant = async (
  name,
  address,
  phone,
  email,
  lat,
  lng,
  url,
  country,
  state,
  city,
  star_count,
  rating_count,
  catogory_name
) => {
  name = helpers.validStringWithNumAndSpecialChar(name);
  address = helpers.validStringWithNumAndSpecialChar(address);
  phone = helpers.validPhoneNumber(phone);
  email = helpers.validEmail(email);
  lat = helpers.checkNumeric(lat);
  lng = helpers.checkNumeric(lng);
  url = helpers.checkUrl(url);
  country = helpers.validString(country);
  state = helpers.validString(state);
  city = helpers.validString(city);
  star_count = helpers.checkNumeric(star_count);
  rating_count = helpers.checkNumeric(rating_count);
  catogory_name = helpers.validStringWithNumAndSpecialChar(catogory_name);
  const restaurantsCollection = await restaurants();
  let createrestaurant = {
    name: name,
    address: address,
    phone: phone,
    email: email,
    lat: lat,
    lng: lng,
    url: url,
    country: country,
    state: state,
    city: city,
    star_count: star_count,
    rating_count: rating_count,
    catogory_name: catogory_name,
  };
  const restaurant = await restaurantsCollection.findOne(createrestaurant);
  if (restaurant) {
    throw "Error: restaurant with these details is already present";
  } else {
    const insertrestaurant = await restaurantsCollection.insertOne(
      createrestaurant
    );

    if (insertrestaurant.insertedCount == 0)
      throw "Error: Could not add restaurant";

    const newId = insertrestaurant.insertedId.toString();

    const restaurant = await getRestaurantById(newId);
    return restaurant;
  }
};

const getAllRestaurants = async () => {
  const restaurantsCollection = await restaurants();
  const allRestaurants = await restaurantsCollection.find({}).toArray();
  if (allRestaurants == null) {
    throw "No restaurants in the database";
  }
  for (let i of allRestaurants) {
    i._id = i._id.toString();
  }
  return allRestaurants;
};

const getRestaurantById = async (id) => {
  helpers.validObjectId(id);
  const restaurantsCollection = await restaurants();
  const restaurant = await restaurantsCollection.findOne({
    _id: new ObjectId(id),
  });
  if (restaurant == null) throw "No restaurant with that id";
  restaurant._id = restaurant._id.toString();
  return restaurant;
};

export default {
  getAllRestaurants: getAllRestaurants,
  getRestaurantById: getRestaurantById,
  createRestaurant: createRestaurant,
};
