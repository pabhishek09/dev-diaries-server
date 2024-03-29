import mongoose from 'mongoose';

const { Schema } = mongoose;

const ParamsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String, required: true }
});

const SignatureSchema = new Schema({
  fnName: { type: String, required: true },
  params: { type: [ParamsSchema], required: true }
});

const ScorerSchema = new Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true }
});

const EvaluateSchema = [
  new Schema({
    args: [Schema.Types.Mixed],
    return: Schema.Types.Mixed
  })
];

const ProblemSchema = new Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  desc: { type: String, required: true },
  signature: { type: SignatureSchema, required: true },
  evaluate: { type: EvaluateSchema, required: true }
});

const ChallengeSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  topScorer: ScorerSchema,
  problemCount: Number,
  problems: [ProblemSchema]
});

const Challenge = mongoose.model('Challenge', ChallengeSchema);

export default Challenge;
