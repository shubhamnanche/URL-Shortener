const express = require("express");
const mongoose = require("mongoose");

const connectMongoDb = require("./connect");
const urlRouter = require("./routes/url");
const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/url")
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((err) => {
    console.log("Mongo DB error:", err);
  });

app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);

app.listen(PORT, () => {
  console.log("Server started at PORT :", PORT);
});
