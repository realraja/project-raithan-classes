import { connectDB } from "@/DataBase/connectDB";
import { AdminAuth, UserAuth } from "./auth";
import { ResponseFailed, ResponseFailedError } from "./Response";

export const adminTryCatch = (passedFunction) => async(req) => {
    try {
        const isAdmin = await AdminAuth(req);
        if (!isAdmin) return ResponseFailed(400, "Please Login First", { isAdmin });

        
        await connectDB();

        return await passedFunction(req);
    } catch (error) {
        console.log('try catch error: ' + error)
        return ResponseFailedError(500, "Internal Server Error", error.message);
    }
}

export const userTryCatch = (passedFunction) => async(req) => {
    try {
        const User = await UserAuth(req);
        if (!User) return ResponseFailed(400, "Please Login First", { User });

        req.id = User._id;

        
        await connectDB();

        return await passedFunction(req);
    } catch (error) {
        console.log('try catch error: ' + error)
        return ResponseFailedError(500, "Internal Server Error", error.message);
    }
}


export const clientTryCatch = (passedFunction) => async(data) => {
    try {
        return await passedFunction(data);
    } catch (error) {
        return ResponseFailedError(500, "Internal Server Error", error.message);
    }
}
