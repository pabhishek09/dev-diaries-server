import express from 'express';
import PlaygroundController from '../controllers/playground.controller';

const router = express.Router();

router.get('/challenges', PlaygroundController.getAllChallenges);

router.get('/challenge/:id', PlaygroundController.getChallengeById);

router.post('/challenge', PlaygroundController.createChallenge);

router.post('/my-challenges/:user', PlaygroundController.getUserChallenges);

router.post('/challenge-attempt/:user/:id', PlaygroundController.getChallengeAttempt);

router.post('/submit-solution', PlaygroundController.submitSolution);

router.get('/leaderboard', PlaygroundController.leaderboard);

export default router;
