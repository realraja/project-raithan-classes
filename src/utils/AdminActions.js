import axios from "axios";



const adminTryCatch = (passedFunction) => async(data) => {
    try {
        return await passedFunction(data);
    } catch (error) {
        console.log(error,error.message);
        return {success:false,message:error.response.data.message ?rejectWithValue(error.response.data.message):rejectWithValue(error.message)};
    }
}

export const CheckAdmin = adminTryCatch(async()=>{
    const {data} = await axios.get(`/api/admin`);
    return data;
})