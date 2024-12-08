const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  restrictToLoggedInUsersOnly,
  checkAuth,
} = require("./middlewares/auth");
const URL = require("./models/url");

const staticRouter = require("./routes/staticRouter");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");

const connectMongoDb = require("./connect");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url")
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
app.use(cookieParser());

app.use("/url", restrictToLoggedInUsersOnly, urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.listen(PORT, () => {
  console.log("Server started at PORT :", PORT);
});
