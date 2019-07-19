import mongoose from 'mongoose';

const { Schema } = mongoose;
const Tag = new Schema({
  name: { type: String }
});
const Reply = new Schema({
  id: { type: Number, required: true },
  desc: { type: String, required: true },
  userId: { type: Number, required: true },
  userName: { type: String, required: true },
  avatar: { type: String, required: true },
  upvotes: { type: Number, required: true },
  postedDateTime: { type: String, required: true }
});
const QuestionSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  postedDateTime: { type: String, required: true },
  replies: [Reply],
  askedBy: { type: String, required: true },
  tags: [Tag]
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
