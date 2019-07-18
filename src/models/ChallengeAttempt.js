import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProblemAttempt = new Schema({
  problemId: { type: String, required: true },
  score: { type: Number, required: true },
  attempts: { type: Number, required: true },
  solution: { type: String, required: true }
});

const ChallengeAttempt = new Schema({
  userId: { type: String, required: true },
  challengeId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  problemCount: { type: Number, required: true },
  problemsAttempted: [ ProblemAttempt ]
});

export default ChallengeAttempt;
