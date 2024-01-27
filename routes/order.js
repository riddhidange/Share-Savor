import { Router } from "express";
import { createOrder, getOrderHistory } from "../data/order.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    let payload = req.body;
    const newOrder = await createOrder({
      resId: payload?._id,
      items: payload?.cart,
      userId: payload?.userId,
      orderAt: new Date().toISOString(),
    });

    res.status(200).json(newOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post("/quickcheckout", async (req, res) => {
  try {
    let payload = req.body;
    const newOrder = await createOrder({
      resId: payload?.restaurant._id,
      items: payload?.items,
      userId: payload?.userId,
      orderAt: new Date().toISOString(),
    });

    res.status(200).json(newOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    let user_id = req.params.id;
    const history = await getOrderHistory(user_id);
    res.status(200).json(history);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
export default router;
