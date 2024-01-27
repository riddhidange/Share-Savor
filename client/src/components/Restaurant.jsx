import { useNavigate, useParams } from "react-router-dom";
//import restaurants from "../../../data/NJData.json";
import { Button } from "@/components/ui/button";
import { addToCart, clearCart, removeFromCart } from "@/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";

import GoogleMapReact from "google-map-react";
import Loading from "./Loading";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import marker from "@/assets/marker.svg";

const Restaurant = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { restaurant } = useSelector((state) => state.cart.value);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewsRef = useRef(null);
  const [formVisibility, setFormVisibility] = useState(false);

  const [dialogState, setDialogState] = useState({
    open: false,
    mealPack: null,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () =>
      (await axios.get(`http://localhost:3000/api/restaurants/${id}`))?.data,
  });

  const AnyReactComponent = ({ text }) => (
    <div>
      <img className="h-10 w-10" src={marker} alt={data.name} />
    </div>
  );

  if (isLoading) return <Loading />;

  const handleAddToCart = (mealPack) => {
    const payload = { ...data, mealPack, toast };
    if (restaurant.cart.length !== 0 && restaurant.order._id !== id) {
      setDialogState((prev) => ({ ...prev, open: true, mealPack }));
      return;
    }
    dispatch(addToCart(payload));
  };

  const handleResetAndAddToCart = () => {
    const payload = { ...data, mealPack: dialogState.mealPack, toast };
    dispatch(clearCart());
    dispatch(addToCart(payload));
  };

  const handleRemoveFromCart = (mealPack) => {
    const payload = { ...data, mealPack, toast };
    dispatch(removeFromCart(payload));
  };

  const render_form = () => {
    if (formVisibility === true) {
      setFormVisibility(false);
    } else {
      setFormVisibility(true);
    }
  };

  const handleFormClose = () => {
    setFormVisibility(false);
  };

  // left to fix
  const defaultProps = {
    center: {
      lat: parseFloat(data?.geoCoordinatesSearch?.split(",")[0] || 0),
      lng: parseFloat(data?.geoCoordinatesSearch?.split(",")[1] || 0),
    },
    zoom: 15,
  };

  return (
    <>
      <Dialog
        open={dialogState.open}
        onOpenChange={(value) =>
          setDialogState((prev) => ({ ...prev, open: value }))
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              You already have items from {restaurant?.order?.name}
            </DialogTitle>
            <DialogDescription>
              If you want to add items from {data?.name}, you will lose your
              items from {restaurant?.order?.name}. Do you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleResetAndAddToCart}>
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between h-10 max-w-screen-2xl 2xl:mx-auto">
        <Button onClick={() => navigate(-1)}>Back</Button>
        <div className="flex justify-end gap-8">
          {user?.orders?.filter((order) => order.resId === id).length > 0 &&
            data?.reviews?.filter((review) => review?.userId === user.id)
              .length === 0 && (
              <div>
                <Button onClick={render_form}>Add a review</Button>
                {formVisibility && (
                  <ReviewForm
                    id={id}
                    onClose={handleFormClose}
                    refetch={refetch}
                  />
                )}
              </div>
            )}
          {/* {`${user?.orders?.filter((order) => order.resId === id).length > 0}`}
        {`${
          data?.reviews?.filter((review) => review?.userId === user.id)
            .length === 0
        }`} */}
          {restaurant.cart.length > 0 && restaurant.order._id === data._id && (
            <div>
              <Link to={`/checkout/${id}`}>
                <Button>Go to Checkout</Button>
              </Link>
            </div>
          )}
          {data.reviews.length > 0 && (
            <div>
              <Button
                onClick={() =>
                  reviewsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                Reviews
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-8 border-gray-300 border-2 rounded-lg max-w-screen-2xl 2xl:mx-auto md:m-12 m-8">
        <div className="flex justify-between">
          <div className="px-16 flex flex-col gap-8">
            <h1 className="text-5xl font-semibold mb-2">Name: {data?.name}</h1>
            <h2 className="text-4xl truncate mb-2">Cuisine: {data?.cuisine}</h2>
            <h3 className="text-2xl ">Address: {data?.address}</h3>
            <h3 className="text-2xl">Rating: {data?.starCount}</h3>
            <h3 className="text-2xl ">Zip Code: {data?.zipCode}</h3>
          </div>
          <div className="mx-auto">
            <img
              src={data?.img || "/Image_not_available.png"}
              alt={data?.name}
              className=" rounded-md h-72 w-full object-contain hover:scale-105 transition transform duration-500 ease-in-out"
            />
          </div>
        </div>

        <div className="p-8 mx-auto space-y-8">
          <div className="flex flex-row items-center rounded-lg mx-auto ">
            {data?.mealPacks?.map((meal) =>
              meal?.availableItems > 0 ? (
                <div key={meal.id} className="rounded-lg px-4 py-2 flex-1">
                  <h2 className="text-lg font-semibold mb-2 first-letter:uppercase">
                    {meal.size} Meal Pack
                  </h2>
                  <p>
                    Available: {meal.availableItems}{" "}
                    {meal.availableItems > 1 ? "packs" : "pack"}
                  </p>
                  <p>Serves: {meal?.serves}</p>
                  <p>Price: {meal?.price}</p>
                  {restaurant.cart.filter((item) => item.id === meal.id)
                    .length === 0 ? (
                    <Button
                      disabled=""
                      onClick={() => handleAddToCart(meal)}
                      className="mt-2 w-full"
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleRemoveFromCart(meal)}
                      className="mt-2 w-full"
                    >
                      Remove from Cart
                    </Button>
                  )}
                </div>
              ) : (
                ""
              ),
            )}
          </div>
          <div
            style={{ height: "350px", width: "100%" }}
            className="mx-auto w-full"
          >
            <Link
              to={`http://maps.google.com/?q=${data?.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                className="w-full"
              >
                <AnyReactComponent
                  lat={defaultProps?.center.lat}
                  lng={defaultProps?.center.lng}
                  text="Marker"
                />
              </GoogleMapReact>
            </Link>
          </div>
        </div>
      </div>

      {data?.reviews?.length > 0 && (
        <div ref={reviewsRef} className="max-w-screen-2xl 2xl:mx-auto pb-36">
          <h1 className="text-center text-3xl">Hear from our Customers</h1>
          {/* <Reviews id={{ id }} /> */}
          {data.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-300 max-w-lg rounded-lg p-4 mb-4"
            >
              <h2 className="text-lg font-bold mb-2">
                Comment: {review.review}
              </h2>
              <h3 className="text-sm mb-2">Rating Given: {review.rating}</h3>
              <h3 className="text-sm">
                Review by: {review.userName} {review.lastName}
              </h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Restaurant;
