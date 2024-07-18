import { AdminAuth } from "@/middleware/auth";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response"
import { cookies } from "next/headers";


export const GET = async(req) => {
    const isAdmin = await AdminAuth(req);
    if(!isAdmin) return ResponseFailed(400,"Invalid token",isAdmin);
    return ResponseSuccess(200,'Admin Verified',isAdmin);
}