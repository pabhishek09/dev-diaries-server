import express from "express";
import authHandler from "../controllers/authController";

require("dotenv").config({ path: `${process.cwd()}/.env` });

const config = process.env;
const router = express.Router();
const qs = require("querystring");

router.get("/", authHandler);

router.get("/login", (req, res) => {
  // generate that csrf_string for state param
  // req.session.csrf_string = randomString.generate();
  // construct the GitHub URL
  const githubAuthUrl = `https://github.com/login/oauth/authorize?${qs.stringify(
    {
      client_id: config.client_id,
      redirect_uri: config.redirect_url,
      // state: req.session.csrf_string,
      scope: "user"
    }
  )}`;
  console.log("githubAuthUrl", githubAuthUrl);
  // redirect user with express
  res.redirect(githubAuthUrl);
});
module.exports = router;
