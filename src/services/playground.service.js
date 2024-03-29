/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-param-reassign */
import UserService from './user.service';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';
import User from '../models/User';
import ChallengeAttempt from '../models/ChallengeAttempt';
import Challenge from '../models/Challenge';

const PlaygroundService = {
  getTestCases: async (challengeId, problemId) => {
    console.log('Inside PlaygroundService: getTestCases', challengeId, problemId);
    try {
      const response = await Challenge.findById(challengeId);
      const { problems } = response;
      const problem = _find(problems, function(prob) {
        // eslint-disable-next-line eqeqeq
        return prob._id == problemId;
      });
      const evaluate = _get(problem, 'evaluate');
      return evaluate;
    } catch (err) {
      console.log('Error in PlaygroundService: getAllChallenges', err);
      throw err;
    }
  },

  getAllChallenges: async projection => {
    console.log('Inside PlaygroundService: getAllChallenges');
    try {
      const response = await Challenge.find()
        .select(projection)
        .select(['-problems.evaluate']);
      console.log('Challenge getAllChallenges successful', response);
      // response = removeTestData(response);
      return response;
    } catch (err) {
      console.log('Error in PlaygroundService: getAllChallenges', err);
      throw err;
    }
  },

  getChallengeById: async challengeId => {
    console.log('Inside PlaygroundService: getChallengeById', challengeId);
    try {
      const response = await Challenge.findById(challengeId).select(['-problems.evaluate']);
      console.log('Challenge getChallengeById successful', response);
      return response;
    } catch (err) {
      console.log('Error in PlaygroundService: getChallengeById', err);
      throw err;
    }
  },

  createChallenge: async challengeBody => {
    console.log('Inside PlaygroundService: createChallenge', challengeBody);
    try {
      challengeBody.problems = _map(challengeBody.problems, (problem, index) => {
        // eslint-disable-next-line no-plusplus
        problem.order = ++index;
        return problem;
      });
      challengeBody.problemCount = challengeBody.problems.length;
      console.log('Challenge body', challengeBody);
      const challenge = new Challenge(challengeBody);
      const response = await challenge.save();
      console.log('Challenge save successful', response);
      return response;
    } catch (err) {
      console.log('Error in PlaygroundService: createChallenge', err);
      throw err;
    }
  },

  getUserAttempts: async (userId, projection) => {
    console.log('Inside PlaygroundService: myChallenges');
    let response;
    try {
      response = await ChallengeAttempt.find({ userId }).select(projection);
      console.log('Challenge getAllChallenges successful', response);
      return response;
    } catch (err) {
      console.log('Error in PlaygroundService: myChallenges', err);
      throw err;
    }
  },

  getChallengeAttempt: async (challengeId, userId) => {
    console.log('Inside PlaygroundService: getChallengeAttempt');
    try {
      const challengeAttempt = await ChallengeAttempt.findOne({
        challengeId,
        userId
      });
      console.log('Challenge attempt', challengeAttempt);
      return challengeAttempt;
    } catch (err) {
      console.log('Error in PlaygroundService: getChallengeAttempt', err);
      throw err;
    }
  },

  handleChallengeAttempt: async (challengeAttempt, pastChallengeAttempt) => {
    // Search for past challenge attempts
    console.log('Inside PlaygroundService: handleChallengeAttempt', challengeAttempt);
    let response;
    try {
      if (pastChallengeAttempt) {
        console.log('User has attempted challenge previously', pastChallengeAttempt);
        // eslint-disable-next-line no-underscore-dangle
        const challengeAttemptId = pastChallengeAttempt._id;
        const problemId = _get(challengeAttempt, 'problemAttempt.problemId');
        const indexOfProblemAttempt = _findIndex(
          pastChallengeAttempt.problemsAttempted,
          problemAttempt => problemAttempt.problemId === problemId
        );
        if (indexOfProblemAttempt !== -1) {
          // Replace problem attempt
          const pastProblemAttempt = pastChallengeAttempt.problemsAttempted[indexOfProblemAttempt];
          console.log('User has previously attempted problem', pastProblemAttempt);
          // Throw an error if maximum attempts have been attempted
          if (pastProblemAttempt.attempts > 2) {
            throw new Error('Maximum attempts attempted');
          }
          // eslint-disable-next-line no-plusplus
          pastProblemAttempt.attempts++;
          pastProblemAttempt.score = challengeAttempt.problemAttempt.score;
          pastProblemAttempt.solution = challengeAttempt.problemAttempt.solution;
        } else {
          console.log('User has newly attempted problem');
          // Push problem attempt
          pastChallengeAttempt.problemsAttempted.push(challengeAttempt.problemAttempt);
        }
        // Calculate new score and update challenge attempt
        pastChallengeAttempt.score = _reduce(
          pastChallengeAttempt.problemsAttempted,
          (sum, problemAttempt) => {
            return sum + problemAttempt.score;
          },
          0
        );
        console.log('Update Challenge request', pastChallengeAttempt);
        const updateChallengeResponse = await ChallengeAttempt.findByIdAndUpdate(
          challengeAttemptId,
          pastChallengeAttempt
        );
        console.log(
          'Exiting PlaygroundService: handleChallengeAttempt, update challenge response',
          updateChallengeResponse
        );
        response = updateChallengeResponse;
      } else {
        // Create new challenge attempt
        challengeAttempt.problemsAttempted = [challengeAttempt.problemAttempt];
        delete challengeAttempt.problemAttempt;
        console.log('Create new Challenge request', challengeAttempt);
        const newChallengeAttempt = new ChallengeAttempt(challengeAttempt);
        const newChallengeResponse = await newChallengeAttempt.save();
        console.log(
          'Exiting PlaygroundService: handleChallengeAttempt, new challenge response',
          newChallengeResponse
        );
        response = newChallengeResponse;
      }
      return response;
    } catch (err) {
      console.log('Error in PlaygroundService: handleChallengeAttempt', err);
      throw err;
    }
  },

  updateUserScore: async (userId, userAttempts) => {
    console.log('Inside PlaygroundService: updateUserScore', userAttempts);
    try {
      const userScore = _reduce(
        userAttempts,
        (sum, userAttempt) => {
          return sum + userAttempt.score;
        },
        0
      );
      console.log('User score', userScore);
      const updateScoreRes = await UserService.updateUserScore(userId, {type: 'playground', score: userScore});
      console.log('Update user score res', updateScoreRes);
      return userScore;
    } catch (err) {
      console.log('Error in PlaygroundService: updateUserScore', err);
      throw err;
    }
  },

  updateChallengeTopScore: async (challengeId, userId, score) => {
    console.log('Inside PlaygroundService: updateChallengeTopScore');
    try {
      const updateChallengeRes = await Challenge.findByIdAndUpdate(challengeId, {
        topScorer: { userId, score }
      });
      console.log('UpdateChallengeTopScore response', updateChallengeRes);
      return updateChallengeRes;
    } catch (err) {
      console.log('Error in PlaygroundService: updateChallengeTopScore', err);
      throw err;
    }
  },

  leaderboard: async () => {
    console.log('Inside PlaygroundService: leaderboard');
    try {
      let allUsers = await User.find({}, '_id playgroundProfile avatar_url login html_url');
      console.log('All users', allUsers);
      let sortedUsersList = allUsers.sort((prevUser, nextUser) => {
        return nextUser.playgroundProfile.score - prevUser.playgroundProfile.score;
      });
      return sortedUsersList;
    } catch (err) {
      console.log('Error in PlaygroundService: leaderboard', err);
      throw err;
    }
  }
};

export default PlaygroundService;
