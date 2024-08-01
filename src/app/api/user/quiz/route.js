import { userTryCatch } from "@/middleware/tryCatch";
import { Quiz } from "@/models/quizes";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const PUT = userTryCatch(async (req) => {
  const {quizId, score} = await req.json();
  if(!quizId && !score ) return ResponseFailed(401,"please fill all the fields");

  const quiz = await Quiz.findById(quizId);

  if(!quiz) return ResponseFailed(400,'question not found');

  quiz.usersDone = quiz.usersDone.filter(user => user.id.toString() !== req.id.toString());

  quiz.usersDone.push({
    id: req.id,
    score
  })

  quiz.save();

  
  

  return ResponseSuccess(201, "question created successfully", quiz);
});
