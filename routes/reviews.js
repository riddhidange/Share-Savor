import { Router } from "express";

const router = Router();

import helpers from "../helpers.js";
import reviewsData from "../data/reviews.js";

router
  .route("/:restaurantId")
  .get(async (req, res) => {
    try {
      // if (!req?.session?.user) {
      //   throw "Unauthorized(401): User is not logged in.";
      // }
      helpers.validObjectId(req.params.restaurantId);
      let reviews = await reviewsData.getAllReviews(req.params.restaurantId);
      return res.status(200).json(reviews);
    } catch (e) {
      if (e.includes("401")) {
        res.status(401).json({ error: e });
      } else if (e.includes("400")) {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: e });
      }
    }
  })
  .post(async (req, res) => {
    let reviewInfo = req.body;
    try {
      // if (!req?.session?.user) {
      //   throw "Unauthorized(401): User is not logged in.";
      // }
      let userId = reviewInfo.user_id;
      helpers.validObjectId(req.params.restaurantId);
      helpers.validObjectId(userId);
      helpers.validStringWithNumAndSpecialChar(reviewInfo.review);
      helpers.checkRatingForReview(reviewInfo.rating);
      let userName = reviewInfo.userName;
      let lastName = reviewInfo.lastName;

      let createdReview = await reviewsData.createReview(
        req.params.restaurantId,
        userId,
        reviewInfo.review,
        reviewInfo.rating,
        userName,
        lastName
      );
      res.status(200).json(createdReview);
    } catch (e) {
      if (e.includes("401")) {
        res.status(401).json({ error: e });
      } else if (e.includes("400")) {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: e });
      }
    }
  })
  .delete(async (req, res) => {
    try {
      // if (!req?.session?.user) {
      //   throw "Unauthorized(401): User is not logged in.";
      // }
      let userId = req?.session?.user?.id;
      helpers.validObjectId(req.params.restaurantId);
      helpers.validObjectId(userId);

      let deleteReview = await reviewsData.deleteReview(
        req.params.restaurantId,
        userId
      );
      res.status(200).json(deleteReview);
    } catch (e) {
      if (e.includes("401")) {
        res.status(401).json({ error: e });
      } else if (e.includes("400")) {
        res.status(400).json({ error: e });
      } else {
        res.status(404).json({ error: e });
      }
    }
  });

export default router;
