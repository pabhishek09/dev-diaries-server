import mongoose from "mongoose";

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
  avatar_url: { type: String, required: true },
  gravatar_id: { type: String },
  url: { type: String, required: true },
  html_url: { type: String, required: true },
  gists_url: { type: String, required: true },
  email: { type: String, required: true },
  playgroundProfile: PlaygroundProfile
  // forumProfile: ForumProfile
});
const User = mongoose.model("User", UserSchema);

export default User;
