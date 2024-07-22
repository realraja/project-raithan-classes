import { adminTryCatch } from "@/middleware/tryCatch";
import { Course } from "@/models/courses";
import User from "@/models/user";

const { createJWT } = require("@/middleware/jwtHash");
const { ResponseFailed, ResponseSuccess } = require("@/middleware/Response");

export const POST = adminTryCatch(async (req) => {
  const { name, phone, password, courses } = await req.json();
  if(!name || !phone || !password || !courses) return ResponseFailed(401,"please fill all the fields");

  

  const user = await User.findOne({ phone: phone });
  if (user)
    return ResponseFailed(401, "this phone no. is already in use", phone);

  const passwordHash = createJWT(password);
  const data = await User.create({
    name,
    phone,
    password: passwordHash,
    verified: true,
    courses,
  });

    const courseUpdate = courses.map(async (i) => {
      const course = await Course.findById(i);
      if (!course) return ResponseFailed(401, "this course not found", i);

      await course.subscribers.push(data._id);
      await course.save();
    });
  
  await Promise.all(courseUpdate);
  return ResponseSuccess(201, "user created successfully", data);
});
