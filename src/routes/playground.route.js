import express from 'express';
import PlaygroundController from '../controllers/playground.controller';
const router = express.Router();

router.get('/challenges', PlaygroundController.getAllChallenges);

router.get('/my-challenges', PlaygroundController.myChallenges);

router.get('/challenge/:id', PlaygroundController.getChallengeById);

router.post('/challenge', PlaygroundController.createChallenge);

router.post('/submit-solution', PlaygroundController.submitSolution);

router.get('/leaderboard', PlaygroundController.leaderboard);

export default router;
