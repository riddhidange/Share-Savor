import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  // TODO: Redesign this page

  return (
    <div className="flex h-full flex-col items-center px-8 pt-24 text-center md:px-20">
      <h1 className="mb-4 text-5xl  font-bold">
        Welcome to Share and Savor – Where Every Bite Counts!
      </h1>
      <p className="mb-8  text-lg">
        🌱 Join a Movement Redefining Food Sharing! 🌱
      </p>
      <div>
        <div className="mb-10 flex flex-col items-start gap-8 md:flex-row md:justify-center">
          <p className="max-w-md rounded-lg border-2 border-slate-200 p-4">
            <span className="mb-3 block font-medium">
              🍕 Tackle Food Waste and Hunger with Just a Tap! 🍕
            </span>{" "}
            Ever thought your love for food could be a force for good? Welcome
            to Share and Savor, the innovative platform transforming the way we
            handle food surplus. We're not just an app; we're a community
            crusade against food waste and insecurity!
          </p>
          <p className="max-w-md rounded-lg border-2 border-slate-200 p-4">
            <span className="mb-3 block font-medium">
              🍲 Connect with a Network of Giving and Receiving 🍲
            </span>{" "}
            Dive into a world where your favorite restaurants are more than just
            eateries; they're partners in a grand food sharing journey. With our
            cutting-edge geolocation features, discover a network of food donors
            and recipients right in your neighborhood.
          </p>
          <p className="max-w-md rounded-lg border-2 border-slate-200 p-4">
            <span className="mb-3 block font-medium">
              🌍 Make an Impact, One Plate at a Time 🌍
            </span>{" "}
            Your actions have power! By joining Share and Savor, you're not just
            getting or giving food – you're making waves in environmental
            sustainability and community support.
          </p>
        </div>
        <div>
          <h3 className="mb-8 text-3xl font-bold">
            Features That Make Sharing Simple
          </h3>
          <div className="mx-auto flex max-w-lg flex-col items-start gap-4">
            <p className="font-mono">
              📍 Geo-Friendly Finds: Locate nearby food sharing spots with ease.
            </p>
            <p className="font-mono">
              💚 Community Connection: Engage with local restaurants and
              community members.
            </p>
            <p className="font-mono">
              🌟 Seamless Sharing: Effortlessly share or claim surplus food.
            </p>
          </div>
        </div>
      </div>
      <Link className="mt-10" to={"/register"}>
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
