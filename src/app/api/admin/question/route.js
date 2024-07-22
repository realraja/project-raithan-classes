import { adminTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { question, answer , options,quiz,timer } = await req.json();
  if(!question || !answer || !options || !quiz) return ResponseFailed(401,"please fill all the fields");

  
  
  const quizUpdate = await Quiz.findById(quiz);
  if (!quizUpdate) return ResponseFailed(401, "this quiz not found", quiz);
  
  const data = await Question.create({ question, answer, options, for:[quiz] ,timer});
  
  
  
  
      await quizUpdate.questions.push(data._id);
      await quizUpdate.save();
  
  

  return ResponseSuccess(201, "question created successfully", data);
});
