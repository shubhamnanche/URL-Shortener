const nanoid = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const { body } = req;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortId = nanoid.nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
  });

  // return res.json({ id: shortId });
}

async function handleGetOriginalURLFromShortId(req, res) {
  const { shortId } = req.params;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    {
      new: true,
    }
  );
  if (!entry) {
    return res.status(404).json({ error: "ShortId not found" });
  }
  res.redirect(entry.redirectURL);
}

async function handleGetAllShortURLs(req, res) {
  const urls = await URL.find();
  return res.status(200).json(urls);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetOriginalURLFromShortId,
  handleGetAllShortURLs,
};
