const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParamsSchema = new Schema({ 
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true }
});

const SignatureSchema = new Schema({
  fnName: { type: String, required: true },
  params: { type: [ ParamsSchema ], required: true }
});

const ScorerSchema = new Schema({
  user: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: String, required: true }
});

const EvaluateSchema = new Schema({
  args: [ Schema.Types.Mixed ],
  return: Schema.Types.Mixed
})

const ProblemSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  desc: { type: String, required: true },
  signature: { type: SignatureSchema, required: true },
  topScorer: [ ScorerSchema ],
  evaluate: { type: EvaluateSchema, required: true }
});

const ChallengeSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  topScorer: [ ScorerSchema ],
  questionCount: Number,
  problems: [ ProblemSchema ]
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

export default Challenge;
