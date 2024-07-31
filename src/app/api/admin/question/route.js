import { adminTryCatch } from "@/middleware/tryCatch";
import { Question } from "@/models/questions";
import { Quiz } from "@/models/quizes";
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");
import cloudinary from "@/lib/cloudinary";

export const POST = adminTryCatch(async (req) => {
  const {questionUrl, question, answer , options,quiz,timer } = await req.json();
  if(!questionUrl && !question || !answer || !quiz) return ResponseFailed(401,"please fill all the fields");

  
  
  const quizUpdate = await Quiz.findById(quiz);
  if (!quizUpdate) return ResponseFailed(401, "this quiz not found", quiz);


  if(questionUrl){
    const uploadResponse = await cloudinary.uploader.upload(questionUrl, {
      folder: 'raithan'
    });

    const data = await Question.create({ questionUrl:uploadResponse.secure_url, answer, for:[quiz] ,timer});   
    
      await quizUpdate.questions.push(data._id);
      await quizUpdate.save(); 
  

  return ResponseSuccess(201, "question created successfully", data);
  }

  if(!options) return ResponseFailed(401,"please fill all the fields");


    const data = await Question.create({ question, answer, options, for:[quiz] ,timer});
  
  
  
  
  
  
      await quizUpdate.questions.push(data._id);
      await quizUpdate.save();
  
  

  return ResponseSuccess(201, "question created successfully", data);
});
