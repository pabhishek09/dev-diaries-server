import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true }
});

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
