import { Router } from "express";

const router = Router();

import helpers from "../helpers.js";
import restaurantsData from "../data/restaurants.js";

// TODO: Validate the users session for all restuarant routes.

// Create a new restaurant
router.post("/", async (req, res) => {
  // Your code to create a new restaurant goes here
  let {
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
    catogory_name,
  } = req.body;

  try {
    // if (!req?.session?.user) {
    //   throw "Unauthorized(401): User is not logged in.";
    // }
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
    const newRestaurant = await restaurantsData.createRestaurant(
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
    );
    res.status(200).json(newRestaurant);
  } catch (e) {
    if (e.includes("401")) {
      res.status(401).json({ error: e });
    } else if (e.includes("400")) {
      res.status(400).json({ error: e });
    } else {
      res.status(404).json({ error: "resource is not found" });
    }
  }
});
// Get all restaurants
router.get("/", async (req, res) => {
  try {
    // if (!req?.session?.user) {
    //   throw "Unauthorized(401): User is not logged in.";
    // }

    const allRestaurants = await restaurantsData.getAllRestaurants();
    return res.status(200).json(allRestaurants);
  } catch (e) {
    if (e.includes("401")) {
      res.status(401).json({ error: e });
    } else if (e.includes("400")) {
      res.status(400).json({ error: e });
    } else {
      res.status(404).json({ error: "resource is not found" });
    }
  }
});
// Get a restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    // if (!req?.session?.user) {
    //   throw "Unauthorized(401): User is not logged in.";
    // }
    helpers.validObjectId(req.params.id);
    // Your code to get a restaurant by ID goes here
    const restaurant = await restaurantsData.getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
  } catch (e) {
    if (e.includes("401")) {
      res.status(401).json({ error: e });
    } else if (e.includes("400")) {
      res.status(400).json({ error: e });
    } else {
      res.status(404).json({ error: "resource is not found" });
    }
  }
});

export default router;
