import React from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import Datahook from "./Datahook";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const DashHistory = () => {
  let { user } = useSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();

  const history = Datahook({
    url: `http://localhost:3000/api/orders/history/${user.id}`,
  }).slice(0, 3);

  const handleCheckout = async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/orders/quickcheckout",
        { ...payload, userId: user.id },
        { withCredentials: true, xsrfCookieName: "AuthCookie" },
      );
      toast({
        title: "Order placed successfully ",
        description: `${payload.items.length} items will be ready for pickup soon.`,
        duration: 2000,
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      navigate("/dashboard");
    } catch (e) {
      toast({
        title: "Oops! Something went wrong.",
        description: `Please try again.`,
        duration: 2000,
        className: "bg-red-500 top-0 right-0 flex fixed md:max-w-[420px]",
      });
      console.log(e);
    }
  };

  return (
    <div className="my-10">
      <div className="flex justify-center items-center gap-56">
        <h1 className="text-center font-bold text-2xl">
          Previously Ordered Restaurants
        </h1>
        <Link to="/history">
          <Button>View All Orders</Button>
        </Link>
      </div>
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {history?.map((res, idx) => (
            <div
              key={idx}
              className="border border-solid border-gray-500 rounded p-6 transition transform hover:shadow-lg flex flex-col justify-between hover:border-gray-100"
            >
              <Link key={res?.resId} to={`/restaurants/${res?.resId}`}>
                <div className="">
                  <img
                    src={res?.restaurant?.img || "/Image_not_available.png"}
                    alt={res?.restaurant?.name}
                    className="mb-4 rounded-md h-60 w-full object-cover hover:scale-105 transition transform duration-500 ease-in-out"
                  />
                  <h1 className="text-xl font-semibold mb-2">
                    {res?.restaurant?.name}
                  </h1>
                  <h4>Location: {res?.restaurant?.address}</h4>

                  <div className="my-4">
                    <h4 className="text-lg">Previously ordered</h4>

                    {res?.items?.map((orders) => (
                      <div key={orders?.id} className="my-4">
                        <h2>
                          Meal pack type:{" "}
                          <span className="first-letter:uppercase">
                            {orders?.size}
                          </span>
                        </h2>
                        <h2 className="font-bold">
                          Order price: ${orders?.price}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
              <Button onClick={() => handleCheckout(res)}>
                Quick Checkout →
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashHistory;
