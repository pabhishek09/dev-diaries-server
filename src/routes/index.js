import express from 'express';
const router = express.Router();
import PlaygroundRoutes from './playground.route';
import ForumRoutes from './forum.route';

/**
 * GET status
 */
router.get('/status', (req, res) => {
  res.send('OK');
});

/**
 * Playground API's
 */
router.use('/playground', PlaygroundRoutes);

/**
 * Forum API's
 */
router.use('/forum', ForumRoutes);

export default router;
