const express = require('express');
const playgroundRoutes = require('./playground.route');
const forumRoutes = require('./forum.route');
const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => {
  res.send('OK');
});

/**
 * Playground API's
 */
router.use('/playground', playgroundRoutes);

/**
 * Forum API's
 */
router.use('/forum', forumRoutes);

module.exports = router;
