import { Link } from "react-router-dom";
import Search from "./Search";
import Datahook from "./Datahook";
import DashHistory from "./DashHistory";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () =>
      (await axios.get(`http://localhost:3000/api/restaurants/`))?.data,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Save Meals from your favorite restaurants!
      </h1>
      <Search />

      {user?.orders?.length && <DashHistory />}
      <h1 className="text-center text-3xl">Available restaurants list</h1>
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {data?.map((res, idx) => (
            <Link key={res._id} to={`/restaurants/${res._id}`}>
              <div className="border border-solid border-gray-500 rounded p-6 transition transform hover:shadow-lg hover:border-gray-100">
                <img
                  src={res?.img || "/Image_not_available.png"}
                  alt={res?.name}
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
