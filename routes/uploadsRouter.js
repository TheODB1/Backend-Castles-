import { Router } from "express";
import imageUploader from "../middlewares/imageUploader.js";
import verifyToken from "../middlewares/verifyToken.js";

const uploadsRouter = Router();

uploadsRouter.post("/", verifyToken, imageUploader.single('profile_pic'), (req, res) => {
    res.send('upload');
});

export default uploadsRouter;
