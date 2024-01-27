import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "./Changepassword";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { logout } from "@/features/userSlice";

const userName = "[username] [lastname]";
const userEmail = "[user email]";

const calculateMetrics = (orders) => {
  const amtFoodSaved = { personal: 2, family: 4 }; // in lbs
  const moneySavedMapper = { personal: 5, family: 8 }; // in $
  let foodSaved = 0;
  let moneySaved = 0;

  orders?.map((order) => {
    order?.items?.map((item) => {
      moneySaved += moneySavedMapper[item.size];
      foodSaved += amtFoodSaved[item.size];
    });
  });

  return [foodSaved, moneySaved];
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  let [foodSaved, moneySaved] = calculateMetrics(user?.orders);

  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <div className="w-3/6">
        <p className="text-5xl font-bold text-gray-800 mb-4">
          Hello, {user?.firstName}!
        </p>
        <p className="text-lg text-gray-600 mr-12">
          We've been together since {new Date(user.createdAt).toDateString()}.
        </p>
        <p className="text-lg text-gray-600 mr-12">
          Your registered e-mail is {user?.email}.
        </p>
        <p className="text-4xl font-bold text-gray-800 mt-8 mb-4">
          Your Impact
        </p>
        <div className="flex justify-center space-x-8 mb-4">
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/save-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-md">${moneySaved} saved so far!</p>
          </div>
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/restaurant-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-md">
              Ordered from {user?.orders?.length} restaurants!
            </p>
          </div>
          <div className="flex flex-col items-center bg-primary p-4 text-white rounded-3xl">
            <img src="/food-white.png" className="w-3/5 h-3/5 mb-2"></img>
            <p className="text-md">
              {foodSaved}lbs of food saved from being wasted!
            </p>
          </div>
        </div>
        {/* <div>
          <Link to={"/change-password"}>
            <button className="text-lg text-gray-600 bg-transparent border-none">
              Change password
            </button>
          </Link>
        </div> */}

        <Button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
