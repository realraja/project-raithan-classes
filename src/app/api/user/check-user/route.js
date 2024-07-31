

import {ResponseSuccess } from "@/middleware/Response"
import {  userTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import User from "@/models/user";


export const GET = userTryCatch(async(req)=>{

        const [user] = await Promise.all([
            User.findById(req.id).populate('courses'),
        ])

        return ResponseSuccess(200,"all Data successfully get",{ user });
})