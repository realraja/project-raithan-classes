import { AdminAuth } from "@/middleware/auth";
import { ResponseFailed, ResponseSuccess } from "@/middleware/Response"


export const GET = async(req) => {
    const isAdmin = await AdminAuth(req);
    if(!isAdmin) return ResponseFailed(400,"Please Login First",{isAdmin});
    return ResponseSuccess(200,'Admin Verified',isAdmin);
}