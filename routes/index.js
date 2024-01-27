import userRoutes from "./users.js";
import orderRoutes from "./order.js";
import restaurantRoutes from "./restaurants.js";
import reviewRoutes from "./reviews.js";

const constructorMethod = (app) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/restaurants", restaurantRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/reviews", reviewRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
