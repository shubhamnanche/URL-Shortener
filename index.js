const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url");

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

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.listen(PORT, () => {
  console.log("Server started at PORT :", PORT);
});
