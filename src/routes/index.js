import express from 'express';
import UserRoutes from './user.route';
import PlaygroundRoutes from './playground.route';
import ForumRoutes from './forum.route';
const router = express.Router();

/**
 * GET status
 */
router.get('/status', (req, res) => {
  res.send('OK');
});

/**
 * User API's
 */
router.use('/user', UserRoutes);

/**
 * Playground API's
 */
router.use('/playground', PlaygroundRoutes);

/**
 * Forum API's
 */
router.use('/forum', ForumRoutes);

export default router;
