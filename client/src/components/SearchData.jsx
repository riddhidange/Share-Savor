import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

function SearchData() {
  const { state } = useLocation();

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Search Results
      </h1>
      <h2 className="text-xl font-medium text-center my-5">
        {state.length === 0
          ? "No restaurants found."
          : `There were ${state.length} restaurants found.`}
      </h2>
      <div className="container mx-auto p-4 my-5">
        <Link to="/dashboard">
          <Button className="my-10">Back to Dashboard</Button>
        </Link>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {state.map((res) => (
            <div
              key={res.id}
              className="border border-solid border-gray-500 rounded p-6 transition transform hover:shadow-lg hover:border-gray-100"
            >
              <img
                src={res.img || "/Image_not_available.png"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/Image_not_available.png";
                }}
                alt="No image found"
                className="mb-4 rounded-md h-60 w-full object-cover hover:scale-105 transition transform duration-500 ease-in-out"
              />
              <h1 className="text-xl font-semibold mb-2">{res?.name}</h1>
              <h2>
                <span className="font-bold">Cuisine:</span> {res?.cuisine}
              </h2>
              <h2>
                <span className="font-bold mr-2">Rating:</span>
                {res?.starCount}
              </h2>
              <h2>
                <span className="font-bold mr-2">Rating Count:</span>
                {res?.ratingCount}
              </h2>
              <h2>
                <span className="font-bold mr-2">Operation Hours:</span>
                Today between {}
              </h2>
              <h2>
                <span className="font-bold mr-2">Address:</span>
                {res?.address}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchData;
