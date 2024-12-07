const express = require("express");
const {
    handleGetAllShortURLs,
  handleGenerateNewShortURL,
  handleGetOriginalURLFromShortId,
} = require("../controllers/url");
const router = express.Router();

router.route("/").get(handleGetAllShortURLs).post(handleGenerateNewShortURL);

router.get("/:shortId", handleGetOriginalURLFromShortId);

module.exports = router;
