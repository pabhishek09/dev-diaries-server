import express from 'express';
import UserRoutes from './user.route';
import PlaygroundRoutes from './playground.route';
import ForumRoutes from './questions.route';

const authRoute = require('./auth.route');
const searchRoute = require('./search.route');

const router = express.Router();
/** Authentication routes * */
router.use('/user/authenticate', authRoute);

/**
 * GET status
 */
router.get('/status', (req, res) => {
  res.send('OKKKK');
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

/** search Route * */
router.use('/search', searchRoute);

export default router;
