import { Router } from "express";
import {
  createCastle,
  deleteCastle,
  getAllCastles,
  getSingleCastle,
  updateCastle,
} from "../controllers/castles.js";
import verifyToken from "../middlewares/verifyToken.js";

const castleRouter = Router();

castleRouter.route("/").get(getAllCastles).post(verifyToken, createCastle);

castleRouter
  .route("/:id")
  .get(getSingleCastle)
  .put(verifyToken, updateCastle)
  .delete(verifyToken,deleteCastle);

export default castleRouter;
