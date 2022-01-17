import { Router } from "express";

const userRouter = Router();

userRouter.post("/signin");
userRouter.post("/signup");
userRouter.get("/me");

export default userRouter;
