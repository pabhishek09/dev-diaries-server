import express from "express";
import QuestionsController from "../controllers/questions.controller";

const router = express.Router();

router.get("/all-questions", QuestionsController.getAllquestions);

router.get("/my-questions/:userId", QuestionsController.myQuestions);

router.get("/question/:id", QuestionsController.getQuestionById);

router.post("/question", QuestionsController.createQuestion);

router.put("question/:id/addReply", QuestionsController.addReply);

router.put(
  "question/:id/reply/:replyId/addUpvote",
  QuestionsController.addUpvote
);
export default router;
