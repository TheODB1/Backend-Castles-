import { Router } from "express";
import { getAllCastles, getSingleCastle } from "../controllers/castles.js";

const castleRouter = Router();

castleRouter.get("/", getAllCastles);

castleRouter.get("/:id", getSingleCastle);

export default castleRouter;
