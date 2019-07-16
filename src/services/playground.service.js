import Challenge from '../models/Challenge';

const PlaygroundService = {

  getAllChallenges: async () => {

  }, 
  
  getChallengeById: async() => {

  }, 
  
  createChallenge: async (challengeBody) => {
    console.log("Inside PlaygroundService: createChallenge");
      let response;
      try {
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
