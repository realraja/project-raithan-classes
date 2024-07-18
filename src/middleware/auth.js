import { cookies } from "next/headers";
import { ResponseFailed } from "./Response";


export const AdminAuth = async(req)=>{
//    const cookie = await req.cookies;
   const cookie = cookies().get("Admin-Token");

   if(!cookie) return false;

   console.log(cookie.value);


    return true;
}