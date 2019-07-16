const mongoose = require("mongoose");

const { Schema } = mongoose;

const Forum = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  replies: [
    {
      description: String,
      upvotes: Number,
      userId: Number
    }
  ]
});

export default Forum;
