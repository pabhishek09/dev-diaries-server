import Question from "../models/Question";

const QuestionsService = {
  getAllQuestions: async () => {
    console.log("Inside QuestionsService: getAllQuestions");
    let response;
    try {
      response = await Question.find({});
      console.log("Question getAllQuestions successful", response);
      return { questions: response };
    } catch (err) {
      console.log("Error in QuestionsService: getAllQuestions", err);
      throw err;
    }
  },

  myQuestions: async userId => {
    console.log("Inside QuestionsService: myQuestions");
    let response;
    try {
      response = await Question.find({ askedBy: userId });
      console.log("Question getAllQuestions successful", response);
      return { questions: response };
    } catch (err) {
      console.log("Error in QuestionsService: myQuestions", err);
      throw err;
    }
  },

  getQuestionById: async QuestionId => {
    console.log("Inside QuestionsService: getQuestionById", QuestionId);
    let response;
    try {
      response = await Question.find({ id: QuestionId });
      console.log("Question getQuestionById successful", response);
      return { questions: response };
    } catch (err) {
      console.log("Error in QuestionsService: getQuestionById", err);
      throw err;
    }
  },

  createQuestion: async QuestionBody => {
    console.log("Inside QuestionsService: createQuestion", QuestionBody);
    let response;
    try {
      console.log("Question body", QuestionBody);
      const que = new Question(QuestionBody);
      response = await que.save();
      console.log("Question save successful", response);
      return response;
    } catch (err) {
      console.log("Error in QuestionsService: createQuestion", err);
      throw err;
    }
  },
  addReply: async (questionId, reply) => {
    console.log("Inside QuestionsService: addReply", reply);
    let response;
    try {
      console.log("Question body", reply);
      response = await Question.update({ id: questionId }, reply, {
        new: true
      });
      console.log("Question save successful", reply);
      return response;
    } catch (err) {
      console.log("Error in QuestionsService: addReply", err);
      throw err;
    }
  },
  addUpvote: async (questionId, replyId) => {
    console.log("Inside QuestionsService: addUpvote", replyId);
    let response;
    try {
      response = await Question.update(
        { "replies.id": replyId },
        { $inc: { "replies.$.upvotes": 1 } },
        { new: true }
      );
      return response;
    } catch (err) {
      console.log("Error in QuestionsService: addReply", err);
      throw err;
    }
  }
};

export default QuestionsService;
