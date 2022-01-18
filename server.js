import "dotenv/config.js";
import "./db/client.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import castleRouter from "./routes/castleRouter.js";
import userRouter from "./routes/userRouter.js";
import uploadsRouter from "./routes/uploadsRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, 'public/uploads');

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use(cors({ origin: "*" }));
app.use(express.static(publicDir));
app.use(express.json());
app.use("/api/castles", castleRouter);
app.use("/auth", userRouter);
app.use("/uploads", uploadsRouter);
app.use('*', (req, res) => res.send('API'));
app.use(errorHandler);

app.listen(port, () => console.log(`Serve at http://localhost:${port}`));
