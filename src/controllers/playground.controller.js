import _get from 'lodash/get';
import { getScore } from '../common/playground.util';
import PlaygroundService from '../services/playground.service';

const PlaygroundController = {

  getTestCases: async (req, res, next) => {
    console.log('Inside PlaygroundController: getTestCases');
    try {
      const challengeId = _get(req, 'params.id');
      const problemId = _get(req, 'params.problemId');
      const tests = await PlaygroundService.getTestCases(challengeId, problemId);
      console.log('Exiting PlaygroundController: getTestCases');
      res.send(tests);
    } catch (err) {
      next(err);
    }
  },

  getAllChallenges: async (req, res, next) => {
    console.log('Inside PlaygroundController: getAllChallenges');
    try {
      const challenges = await PlaygroundService.getAllChallenges();
      console.log('Exiting PlaygroundController: getAllChallenges');
      res.send(challenges);
    } catch (err) {
      next(err);
    }
  },

  getChallengeById: async (req, res, next) => {
    console.log('Inside PlaygroundController: getChallengeById');
    try {
      const challengeId = _get(req, 'params.id');
      const challenge = await PlaygroundService.getChallengeById(challengeId);
      console.log('Exiting PlaygroundController: getChallengeById');
      res.send(challenge);
    } catch (err) {
      next(err);
    }
  },

  createChallenge: async (req, res, next) => {
    console.log('Inside PlaygroundController: createChallenge');
    try {
      const challengeBody = req.body;
      console.log('Challenge body', challengeBody);
      const createChallengeRes = await PlaygroundService.createChallenge(challengeBody);
      console.log('Exiting PlaygroundController: createChallenge');
      res.send(createChallengeRes);
    } catch (err) {
      next(err);
    }
  },

  getUserChallenges: async (req, res, next) => {
    console.log('Inside PlaygroundController: getUserAttempts');
    try {
      const userId = _get(req, 'params.user');
      const userAttempts = await PlaygroundService.getUserAttempts(userId, '');
      console.log('Exiting PlaygroundController: getUserAttempts');
      res.send(userAttempts);
    } catch (err) {
      next(err);
    }
  },

  getChallengeAttempt: async (req, res, next) => {
    console.log('Inside PlaygroundController: getChallengeAttempt');
    try {
      const userId = _get(req, 'params.user');
      const challengeId = _get(req, 'params.id');
      const challengeAttempts = await PlaygroundService.getChallengeAttempt(userId, challengeId);
      console.log('Exiting PlaygroundController: getChallengeAttempt');
      res.send(challengeAttempts);
    } catch (err) {
      next(err);
    }
  },

  submitSolution: async (req, res, next) => {
    console.log('Inside PlaygroundController: submitAttempt');
    try {
      const solutionBody = req.body;
      console.log(solutionBody);
      const { solution } = solutionBody;
      const { userId } = solutionBody;
      const evaluate = await PlaygroundService.getTestCases(solutionBody.challengeId, solutionBody.problemId);
      const score = getScore(solution, solutionBody.fnName, evaluate);
      // Payload is created assuming this to be user's first problem solution in a challenge
      const challengeAttempt = {
        userId,
        challengeId: solutionBody.challengeId,
        name: solutionBody.name,
        problemCount: solutionBody.problemCount,
        score,
        problemAttempt: {
          problemId: solutionBody.problemId,
          score,
          solution,
          attempts: 1
        }
      };
      console.log('Challenge attempt body', challengeAttempt);
      const pastChallengeAttempt = await PlaygroundService.getChallengeAttempt(
        challengeAttempt.challengeId,
        userId
      );
      const attemptResponse = await PlaygroundService.handleChallengeAttempt(
        challengeAttempt,
        pastChallengeAttempt
      );
      console.log('Attempt response', attemptResponse);
      const userAttempts = await PlaygroundService.getUserAttempts(userId, '-problemsAttempted');
      await PlaygroundService.updateUserScore(userId, userAttempts);
      const userScore = attemptResponse.score;
      if (userScore > solutionBody.topScore) {
        await PlaygroundService.updateChallengeTopScore(
          solutionBody.challengeId,
          userId,
          userScore
        );
      }
      console.log('Exiting PlaygroundController: submitAttempt');
      res.send(attemptResponse);
    } catch (err) {
      next(err);
    }
  },

  leaderboard: async (req, res, next) => {
    console.log('Inside PlaygroundController: leaderboard');
    try {
      const leaderboardRes = await PlaygroundService.leaderboard();
      console.log('Exiting PlaygroundController: leaderboard');
      res.send(leaderboardRes);
    } catch (err) {
      next(err);
    }
  }
};

export default PlaygroundController;
