import React from "react";
// TODO: Rectangular style cards for restaurants with header section for filters and search bar.
import restaurants from "./../../../data/restaurants.json";
import { Link } from "react-router-dom";

const RestaurantsList = () => {
  return (
    <div className="h-full bg-black/10">
      <p>This is placeholder text for the restaurant list.</p>
      <div className="grid grid-cols-3 p-4">
        <h1>Previously ordered from restaurants</h1>
        <h1>Search functionality</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {restaurants.map((res) => (
          <div key={res.id} className="rounded-lg border-2 border-black/20 p-4">
            <img src="" alt="No image found" />
            <Link to={`/restaurants/${res.id}`}>
              <h1 className="font-bold">Name: {res.name}</h1>
            </Link>
            <h2 className="h-10 truncate">Cuisine: {res.category_name}</h2>
            <h3>Rating: {res.star_count}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsList;
