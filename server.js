import 'dotenv/config.js'
import express from "express";
import castleRouter from './routes/castleRouter.js'
import './db/client.js'

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is ready");
});
app.use('/api/castles', castleRouter)

app.listen(port, () => console.log(`Serve at http://localhost:${port}`));
