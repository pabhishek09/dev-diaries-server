var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
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
