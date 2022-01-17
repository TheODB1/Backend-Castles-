import express from "express";
import cors from 'cors';
import 'dotenv/config.js';
import './db/client.js';
import castleRouter from './routes/castleRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// app.use(cors);
app.use(express.json());
app.use('/api/castles', castleRouter)
app.use('/auth', userRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Serve at http://localhost:${port}`));
