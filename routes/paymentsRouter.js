import { Router } from "express";
import { createCheckoutSession } from "../controllers/payments.js";

const paymentsRouter = Router();

paymentsRouter.post("/create-checkout-session", createCheckoutSession );

export default paymentsRouter;
