const mongoose = require('mongoose');
const Question = require('./Challenge');
const Schema = mongoose.Schema;

const Challenge = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  desc: String,
  topScorers: [
    {
      id: String,
      score: Number
    }
  ],
  questionCount: Number,
  questions: [ Question ]
});

export default Challenge;
