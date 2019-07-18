const express = require("express");
const randomString = require("randomstring");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const config = process.env;
const router = express.Router();
const authHandler = require("../controllers/authController");
const qs = require("querystring");
router.get("/", (req, res) => {
  authHandler(req, res);
});

router.get("/login", (req, res) => {
  console.log(
    "how",
    `https://github.com/login/oauth/authorize?${qs.stringify({
      client_id: config.client_id,
      redirect_uri: config.redirect_url,
      state: req.session.csrf_string,
      scope: "user"
    })}`
  );
  // generate that csrf_string for state param
  req.session.csrf_string = randomString.generate();
  // construct the GitHub URL
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${qs.stringify(
    {
      client_id: config.client_id,
      redirect_uri: config.redirect_url,
      state: req.session.csrf_string,
      scope: "user"
    }
  )}`;
  console.log("githubAuthUrl", githubAuthUrl);
  // redirect user with express
  res.redirect(githubAuthUrl);
});
module.exports = router;
