import mongoose from 'mongoose';
import Challenge from '../models/Challenge';
import _map from 'lodash/map';

const PlaygroundService = {

  getAllChallenges: async () => {

  }, 
  
  getChallengeById: async() => {

  }, 
  
  createChallenge: async (challengeBody) => {
    console.log("Inside PlaygroundService: createChallenge", challengeBody);
      let response;
      try {
        challengeBody['id'] = new mongoose.Types.ObjectId;
        challengeBody['problems'] = _map(challengeBody['problems'], (problem, index) => { 
          problem['id'] = new mongoose.Types.ObjectId;
          problem['order'] = ++index;
          return problem;
        });
        challengeBody['problemCount'] = challengeBody['problems'].length;
        console.log('Challenge body', challengeBody);
        const challenge = new Challenge(challengeBody);
        response = await challenge.save();
        console.log("Challenge save successful", response);
        return response;
      } catch (err) {
        console.log("Error in PlaygroundService: createChallenge", err);
        throw err;
      }
    }

};

export default PlaygroundService;
