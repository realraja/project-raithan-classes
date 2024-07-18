import { ResponseFailed, ResponseSuccess } from "@/middleware/Response";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";



export const POST = async(req)=>{
    const {username,password} = await req.json();
    if(!username || !password) return ResponseFailed(400,'Please fill all the fields!');

    try {    
        const token = jwt.sign({username,password},process.env.JWT_SECRET);

        cookies().set({
            name: "Admin-Token",
            value: token,
            httpOnly: true,
            maxAge: process.env.DAY_COOKIE*24 * 60 * 60,
          });

        return ResponseSuccess(200,'Admin Login Successfully',token);

    } catch (error) {
        console.log('error in login admin==>',error);
        return ResponseFailed(400,'Admin Login Failed');
    }

    
}
export const GET = async(req)=>{

    try {    
        const token = jwt.sign('{username,password}',process.env.JWT_SECRET);

        cookies().set({
            name: "token",
            value: token,
            httpOnly: true,
            maxAge: process.env.DAY_COOKIE*24 * 60 * 60,
          });

        return ResponseSuccess(200,'Admin Login Successfully',token);

    } catch (error) {
        console.log('error in login admin==>',error);
        return ResponseFailed(400,'Admin Login Failed');
    }

    
}