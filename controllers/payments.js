import stripe from "stripe";
import { stripHtml } from "string-strip-html";
import asyncHandler from "../middlewares/asyncHandler.js";

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
        description: stripHtml(description).result,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.DREAM_CASTLE_FRONT}/confirm-order`,
    cancel_url: `${process.env.DREAM_CASTLE_FRONT}/cancel-order`,
  });
  res.json({ checkoutURL: session.url });
});
