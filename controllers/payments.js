import stripe from "stripe";
import asyncHandler from "../middlewares/asyncHandler.js";

const YOUR_DOMAIN = "http://localhost:3000";

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const {
    body: { name, image, price, description },
  } = req;
  const stripeClient = stripe(process.env.STRIPE_PRIVATE_KEY);
  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        images: [image],
        amount: price * 100,
        name,
        currency: "eur",
        description,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ checkoutURL: session.url });
});
