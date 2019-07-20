import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlaygroundProfile = new Schema({
  score: Number,
  level: String
});

// const ForumProfile = new Schema({});

const UserSchema = new Schema({
  login: { type: String, required: true },
  id: { type: Number, required: true },
  node_id: { type: String, required: true },
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  gists_url: String,
  email: String,
  playgroundProfile: PlaygroundProfile,
  forumProfile: PlaygroundProfile
});
const User = mongoose.model('User', UserSchema);

export default User;
