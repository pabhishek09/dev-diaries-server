import mongoose from 'mongoose';
const pick = require('lodash.pick');
require('dotenv').config({ path: `${process.cwd()}/.env` });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
const findUser = uid => {
  const user = db.collection('users').find({ id: uid });
  return user;
};

const createUser = userData => {
  const gitData = pick(userData, [
    'login',
    'id',
    'nodeId',
    'avatarUrl',
    'gravatarId',
    'url',
    'htmlUrl',
    'gistsUrl',
    'email'
  ]);

  db.collection('users').insertOne(gitData, function(err, res) {
    if (err) throw err;
    console.log('Document inserted');
    // close the connection to db when you are done with it
    db.close();
  });
};
