import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/castles/:id", (req, res) => {
  const castle = data.castles.find((x) => x._id === req.params.id);
  if (castle) {
    res.send(castle);
  } else {
    res.status(404).send({ message: " Castle not Found"  });
  }
});

app.get("/api/castles", (req, res) => {
  res.send(data.castles);
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
