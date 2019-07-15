var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  login: String,
  id: Number,
  nodeId: String,
  avatarUrl: String,
  gravatarId: String,
  url: String,
  htmlUrl: String,
  gistsUrl: String,
  email: String,
  playground: {
    score: Number,
    level: String,
    challenges: [
      {
        id: String,
        name: String,
        score: Number,
        questions: [
          {
            id: String,
            name: String,
            score: Number,
            attempts: Number
          }
        ]
      }
    ]
  }
});

export default User;
