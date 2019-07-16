const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  desc: String,
  signature: {
    name: String,
    params: [{
      name: String,
      type: String,
      desc: String
    }]
  },
  topScorer: {
    id: String,
    score: Number
  }
});

export default Question;
