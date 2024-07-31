import { userTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const PUT = userTryCatch(async (req) => {
  const {questionId, option} = await req.json();
  if(!questionId && !option ) return ResponseFailed(401,"please fill all the fields");

  const question = await Question.findById(questionId);

  if(!question) return ResponseFailed(400,'question not found');

  question.users = question.users.filter(user => user.id === req.id);

  question.users.push({
    id: req.id,
    choosed:option,
    result: option === 'e' ? "Not Attempted" : option === question.answer ? "Right" :"Wrong"
  })

  question.save();

 
  

  return ResponseSuccess(201, "question created successfully", question);
});
