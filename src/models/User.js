const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemAttempt = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  attempts: { type: Number, required: true },
  solution: { type: String, required: true }
});

const ChallengeProgress = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  problemAttempts: [ ProblemAttempt ]
});

const PlaygroundProfile = new Schema({
    score: Number,
    level: String,
    attemptedChallenges: [ ChallengeProgress ]
});

const ForumProfile = new Schema({});

const User = new Schema({
  login: { type: String, required: true },
  id: { type: Number, required: true },
  nodeId: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  gravatarId: { type: String, required: true },
  url: { type: String, required: true },
  htmlUrl: { type: String, required: true },
  gistsUrl: { type: String, required: true },
  email: { type: String, required: true },
  playgroundProfile: PlaygroundProfile,
  forumProfile: ForumProfile
});

export default User;
