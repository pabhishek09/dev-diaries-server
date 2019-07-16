const express = require("express");
const playgroundRoutes = require("./playground.route");
const forumRoutes = require("./forum.route");
const authRoute = require("./auth.route");
const searchRoute = require("./search.route");
const router = express.Router();
/** Authentication routes * */
router.use("/user/authenticate", authRoute);

/**
 * GET status
 */
router.get("/status", (req, res) => {
  res.send("OK");
});

/**
 * Playground API's
 */
router.use("/playground", playgroundRoutes);

/**
 * Forum API's
 */
router.use("/forum", forumRoutes);

/** search Route **/
router.use("/search", searchRoute);
module.exports = router;
