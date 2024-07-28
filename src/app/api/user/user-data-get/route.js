

import {ResponseSuccess } from "@/middleware/Response"
import {  userTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import { Quiz } from "@/models/quizes";
import User from "@/models/user";


export const GET = userTryCatch(async(req)=>{

        const [user,courses] = await Promise.all([
            User.findById(req.id),
            Course.find({subscribers:req.id}),
        ])

        const quiz = await Quiz.find({forCourse:courses[0]._id}).populate('questions').populate('forSubject', '_id name')

        return ResponseSuccess(200,"all Data successfully get",{ user,courses,quizes:quiz });
})