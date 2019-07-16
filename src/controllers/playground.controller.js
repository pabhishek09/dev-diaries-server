import PlaygroundService from '../services/playground.service';
import _get from 'lodash/get';

const PlaygroundController = {

  getAllChallenges: async (req, res, next) => {
    console.log("Inside PlaygroundController: getAllChallenges");
    try {
      const challenges = await PlaygroundService.getAllChallenges();
      console.log("Exiting PlaygroundController: getAllChallenges");
      res.send(challenges);
    } catch (err) {
      next(err);
    }
  }, 
  
  getChallengeById: async(req, res, next) => {
    console.log("Inside PlaygroundController: getChallengeById");
    try {
      const challengeId = _get(req, "params.id");
      const challenge = await PlaygroundService.getChallengeById(challengeId);
      console.log("Exiting PlaygroundController: getChallengeById");
      res.send(challenge);
    } catch (err) {
      next(err);
    }
  }, 

  createChallenge: async (req, res, next) => {
    console.log("Inside PlaygroundController: createChallenge");
    try {
      const challengeBody = req.body;
      console.log("Challenge body", challengeBody);
      const createChallengeRes = await PlaygroundService.createChallenge(challengeBody);
      console.log("Exiting PlaygroundController: createChallenge");
      res.send(createChallengeRes);
    } catch (err) {
      next(err);
    }
  }
};

export default PlaygroundController;
