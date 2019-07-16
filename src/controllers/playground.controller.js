import PlaygroundService from '../services/playground.service';
import _get from 'lodash/get';

const PlaygroundController = {

  getAllChallenges: async (req, res, next) => {

  }, 
  
  getChallengeById: async(req, res, next) => {
    const challengeId = _get(req, "params.id");
    console.log("Challenge", challengeId);
    res.send(challengeId);
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
