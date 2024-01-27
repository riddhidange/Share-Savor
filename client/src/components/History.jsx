import React from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useToast } from "./ui/use-toast";

import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const History = () => {
  let { user } = useSelector((state) => state.user);
  const { toast } = useToast();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["history"],
    queryFn: async () =>
      (await axios.get(`http://localhost:3000/api/orders/history/${user.id}`))
        ?.data,
  });

  if (isLoading) return <Loading />;

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
        status: "success",
        duration: 2500,
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="mt-4">
        <h1 className="text-center font-bold text-4xl">
          So far you have placed {data?.length}{" "}
          {data?.length === 1 ? "order" : "orders"}
        </h1>
        <div className="container mx-auto p-4 my-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data?.map((order, idx) => (
              <div
                className="border border-solid border-gray-500 rounded p-6 transition transform hover:shadow-lg flex flex-col justify-between hover:border-gray-100"
                key={order?._id}
              >
                <Link to={`/restaurants/${order?.resId}`}>
                  <div className="">
                    <img
                      src={order?.restaurant?.img || "/Image_not_available.png"}
                      alt={order?.restaurant?.name}
                      className="mb-4 rounded-md h-60 w-full object-cover hover:scale-105 transition transform duration-500 ease-in-out"
                    />
                    <h1 className="text-xl font-semibold mb-2">
                      {order?.restaurant?.name}
                    </h1>
                    <h2>
                      <span className="font-bold">Cuisine:</span>{" "}
                      {order?.restaurant?.cuisine}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Rating:</span>
                      {order?.restaurant?.starCount}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Rating Count:</span>
                      {order?.restaurant?.ratingCount}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Operation Hours:</span>
                      Today between {}
                    </h2>
                    <h2>
                      <span className="font-bold mr-2">Address:</span>
                      {order?.restaurant?.address}
                    </h2>

                    <div className="mt-4">
                      <h4 className="text-lg">Previously ordered:</h4>

                      {order?.items?.map((orders) => (
                        <div key={orders?.id} className="my-4">
                          <h2>Meal pack type: {orders?.size}</h2>
                          <h2 className="font-bold">Price: ${orders?.price}</h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
                <Button onClick={() => handleCheckout(order)}>
                  Quick Checkout
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
