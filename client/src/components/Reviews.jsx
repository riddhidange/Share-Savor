import React from "react";
import Datahook from "./Datahook";

const Reviews = ({ id }) => {
  const rest_id = id;
  const { data } = Datahook({
    url: `http://localhost:3000/api/reviews/${rest_id.id}`,
  });

  return (
    <>
      {data?.length > 0 &&
        data?.map((review) => (
          <div
            key={review._id}
            className="bg-white border border-gray-300 rounded-lg p-4 mb-4"
          >
            <h2 className="text-lg font-bold mb-2">Comment: {review.review}</h2>
            <h3 className="text-sm mb-2">Rating Given: {review.rating}</h3>
            <h3 className="text-sm">
              Review by: {review.userName} {review.lastName}
            </h3>
          </div>
        ))}
    </>
  );
};

export default Reviews;
