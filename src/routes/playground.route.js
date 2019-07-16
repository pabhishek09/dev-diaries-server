import express from 'express';
import PlaygroundController from '../controllers/playground.controller';
const router = express.Router();

router.get('/challenge', PlaygroundController.getAllChallenges);

router.get('/challenge/:id', PlaygroundController.getChallengeById);

router.post('/challenge', PlaygroundController.createChallenge);

export default router;
