import { Router } from "express";
import data from "../data.js";

const castleRouter = Router();

castleRouter.get("/", (req, res) => {
  res.send(data.castles);
});

castleRouter.get("/:id", (req, res) => {
  const castle = data.castles.find((x) => x._id === req.params.id);
  if (castle) {
    res.send(castle);
  } else {
    res.status(404).send({ message: " Castle not Found" });
  }
});

export default castleRouter;
