const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name: name, email: email, password: password });
  return res.render("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email, password: password });
  // console.log(`User ${user}`);

  if (!user) {
    return res.render("login", {
      error: "Invalid username or password!",
    });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
