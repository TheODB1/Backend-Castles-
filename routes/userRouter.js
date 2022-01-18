import { Router } from "express";
import { deleteUser, getUser, signIn, signUp, updateUser } from "../controllers/users.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin",signIn );
userRouter.get("/me", verifyToken, getUser);

userRouter
  .route("/me/:id")  
  .put(verifyToken, updateUser)
  .delete(verifyToken,deleteUser);

export default userRouter;
