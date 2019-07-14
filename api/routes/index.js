const express = require('express');
const playgroundRoutes = require('./playground.route');
const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/playground', playgroundRoutes);

module.exports = router;
