import _get from "lodash/get";
import QuestionsService from "../services/questions.service";

const QuestionsController = {
  getAllQuestions: async (req, res, next) => {
    console.log("Inside QuestionsControllers: getAllQuestions");
    try {
      const Questions = await QuestionsService.getAllQuestions();
      console.log("Exiting QuestionsControllers: getAllQuestions");
      res.send(Questions);
    } catch (err) {
      next(err);
    }
  },

  myQuestions: async (req, res, next) => {
    console.log("Inside QuestionsControllers: myQuestions");
    try {
      const userId = _get(req, "params.userId");

      const myQuestions = await QuestionsService.myQuestions(userId);
      console.log("Exiting QuestionsControllers: myQuestions");
      res.send(myQuestions);
    } catch (err) {
      next(err);
    }
  },

  getQuestionById: async (req, res, next) => {
    console.log("Inside QuestionsControllers: getQuestionById");
    try {
      const QuestionId = _get(req, "params.id");
      const Question = await QuestionsService.getQuestionById(QuestionId);
      console.log("Exiting QuestionsControllers: getQuestionById");
      res.send(Question);
    } catch (err) {
      next(err);
    }
  },

  createQuestion: async (req, res, next) => {
    console.log("Inside QuestionsControllers: createQuestion");
    try {
      const QuestionBody = req.body;
      console.log("Question body", QuestionBody);
      const createQuestionRes = await QuestionsService.createQuestion(
        QuestionBody
      );
      console.log("Exiting QuestionsControllers: createQuestion");
      res.send(createQuestionRes);
    } catch (err) {
      next(err);
    }
  },
  addReply: async (req, res, next) => {
    console.log("Inside QuestionsControllers: createQuestion");
    try {
      const QuestionBody = req.body;
      const QuestionId = _get(req, "params.id");
      console.log("Question body", QuestionBody, QuestionId);
      const createQuestionRes = await QuestionsService.addReply(
        QuestionId,
        QuestionBody
      );
      console.log("Exiting QuestionsControllers: createQuestion");
      res.send(createQuestionRes);
    } catch (err) {
      next(err);
    }
  },
  addUpvote: async (req, res, next) => {
    console.log("Inside QuestionsControllers: createQuestion");
    try {
      const QuestionId = _get(req, "params.id");
      const replyId = _get(req, "params.replyId");
      const createQuestionRes = await QuestionsService.addUpvote(
        QuestionId,
        replyId
      );
      console.log("Exiting QuestionsControllers: createQuestion");
      res.send(createQuestionRes);
    } catch (err) {
      next(err);
    }
  }
};

export default QuestionsController;
