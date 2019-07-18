import _get from "lodash/get";
import { getScore } from "../common/playground.util";
import PlaygroundService from "../services/playground.service";

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

  myChallenges: async (req, res, next) => {
    console.log("Inside PlaygroundController: myChallenges");
    try {
      const myChallenges = await PlaygroundService.getAllChallenges();
      console.log("Exiting PlaygroundController: myChallenges");
      res.send(myChallenges);
    } catch (err) {
      next(err);
    }
  },

  getChallengeById: async (req, res, next) => {
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
      const createChallengeRes = await PlaygroundService.createChallenge(
        challengeBody
      );
      console.log("Exiting PlaygroundController: createChallenge");
      res.send(createChallengeRes);
    } catch (err) {
      next(err);
    }
  },

  submitSolution: async (req, res, next) => {
    console.log("Inside PlaygroundController: submitAttempt");
    try {
      const solutionBody = req.body;
      const { solution } = solutionBody;
      const score = getScore(
        solution,
        solutionBody.fnName,
        solutionBody.evaluate
      );
      // Payload is created assuming this to be user's first problem solution in a challenge
      const challengeAttempt = {
        userId: solutionBody.userId,
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
      const attemptResponse = await PlaygroundService.handleChallengeAttempt(
        challengeAttempt
      );
      console.log("Attempt response", attemptResponse);
      const userScore = attemptResponse.score;
      if (userScore > solutionBody.topScore) {
        await updateChallengeTopScore();
      }
      console.log("Exiting PlaygroundController: submitAttempt");
    } catch (err) {
      next(err);
    }
  },

  leaderboard: async (req, res, next) => {
    console.log("Inside PlaygroundController: leaderboard");
    try {
      const leaderboardRes = await PlaygroundService.leaderboard();
      console.log("Exiting PlaygroundController: leaderboard");
      res.send(leaderboardRes);
    } catch (err) {
      next(err);
    }
  }
};

export default PlaygroundController;
