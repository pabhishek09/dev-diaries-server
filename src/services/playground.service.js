import Challenge from '../models/Challenge';
import ChallengeAttempt from '../models/ChallengeAttempt';
import User from '../models/User';
import _map from 'lodash/map';
import _reduce from 'lodash/map';
import _findIndex from 'lodash/findIndex';

const PlaygroundService = {

  getAllChallenges: async () => {
    console.log("Inside PlaygroundService: getAllChallenges");
    let response;
    try {
      response = await Challenge.find({}, 'name desc problemCount topScorer');
      console.log("Challenge getAllChallenges successful", response);
      return response;
    } catch (err) {
      console.log("Error in PlaygroundService: getAllChallenges", err);
      throw err;
    }
  },

  myChallenges: async(userId) => {
    console.log("Inside PlaygroundService: myChallenges");
    let response;
    try {
      response = await ChallengeAttempt.find({ userId });
      console.log("Challenge getAllChallenges successful", response);
      return response;
    } catch (err) {
      console.log("Error in PlaygroundService: myChallenges", err);
      throw err;
    }
  },

  getChallengeById: async(challengeId) => {
    console.log("Inside PlaygroundService: getChallengeById", challengeId);
    let response;
    try {
      response = await Challenge.findById(challengeId);
      console.log("Challenge getChallengeById successful", response);
      return response;
    } catch (err) {
      console.log("Error in PlaygroundService: getChallengeById", err);
      throw err;
    }
  },

  createChallenge: async (challengeBody) => {
    console.log("Inside PlaygroundService: createChallenge", challengeBody);
    let response;
    try {
      challengeBody['problems'] = _map(challengeBody['problems'], (problem, index) => { 
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
  }, 
  
  getChallengeAttempt: async(challengeId, userId) => {
    console.log("Inside PlaygroundService: getChallengeAttempt", challengeBody);
    let response;
    try {
      const challengeAttempt = await ChallengeAttempt.findOne({challengeId, userId});
      console.log("Challenge attempt", challengeAttempt);
      return challengeAttempt;
    } catch (err) {
      console.log("Error in PlaygroundService: getChallengeAttempt", err);
      throw err;
    }
  }, 
  
  handleChallengeAttempt: async (challengeAttempt) => {
    // Search for past challenge attempts
    console.log("Inside PlaygroundService: handleChallengeAttempt", challengeAttempt);
    let response;
    try {
      const pastChallengeAttempt = await getChallengeAttempt(challengeAttempt.challengeId, challengeAttempt.userId);
      const problemId = _get(challengeAttempt, 'problemAttempt.problemId');
      if (pastChallengeAttempt) {
        console.log('User has attempted challenge previously', pastChallengeAttempt);
        const challengeAttemptId = pastChallengeAttempt._id;
        let indexOfProblemAttempt = _findIndex(pastChallengeAttempt.problemsAttempted, (problemAttempt) => problemAttempt.problemId === problemId);
        if (indexOfProblemAttempt !== -1) {
          // Replace problem attempt
          const pastProblemAttempt = pastChallengeAttempt.problemsAttempted[indexOfProblemAttempt];
          console.log('User has previously attempted problem', pastProblemAttempt);
          // Throw an error if maximum attempts have been attempted
          if (pastProblemAttempt.attempts > 2) {
            throw new Error('Maximum attempts attempted');
          }
          pastProblemAttempt.attempts++;
          pastProblemAttempt.score = challengeAttempt.problemAttempt.score;
          pastProblemAttempt.solution = challengeAttempt.problemAttempt.solution;
        } else {
          console.log('User has newly attempted problem');
          // Push problem attempt
          const newProblemAttempt = challengeAttempt.problemAttempt;
          pastChallengeAttempt.problemsAttempted.push(newProblemAttempt);
        }
        // Calculate new score and update challenge attempt
        pastChallengeAttempt.score = _reduce(pastChallengeAttempt.problemsAttempted, (sum, problemAttempt) => {
          return sum + problemAttempt.score;
        }, 0);
        console.log("Update Challenge request", pastChallengeAttempt);
        const updateChallengeResponse = await ChallengeAttempt.findByIdAndUpdate(challengeAttemptId, pastChallengeAttempt);
        console.log("Exiting PlaygroundService: handleChallengeAttempt, update challenge response", updateChallengeResponse);
        response = updateChallengeResponse.score;
      } else {
        // Create new challenge attempt
        console.log("Create new Challenge request", challengeAttempt);
        const challengeAttempt = new ChallengeAttempt(challengeAttempt);
        const newChallengeResponse = await challengeAttempt.save();
        console.log("Exiting PlaygroundService: handleChallengeAttempt, new challenge response", newChallengeResponse);
        response = newChallengeResponse.score;
      }
      return response;
    } catch(err) {
      throw err;
    }
  }, 
  
  updateUserScore: async(userId) => {

  }, 
  
  updateChallengeTopScore: async() => {

  }, 
  
  leaderboard: async () => {
      console.log("Inside PlaygroundService: leaderboard");
      let response;
      try {
        response = await User.find().sort({ field: 'playgroundProfile.score', test: -1 }).limit(3);
        console.log("Get leaderboard successful", response);
        return response;
      } catch (err) {
        console.log("Error in PlaygroundService: leaderboard", err);
        throw err;
      }
  }
};

export default PlaygroundService;
