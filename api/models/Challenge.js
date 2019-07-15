var mongoose = require('mongoose');
var Question = require('./Challenge');
var Schema = mongoose.Schema;

var Challenge = new Schema({
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
