import axios from "axios"



export const UpdateQuestion = async(Detail)=>{
    try {
        // console.log(Detail)
        const {data} = await axios.put('/api/user/question', Detail);
        console.log(data);
    } catch (error) {
        console.log(error,error.message);
    }
}

export const UpdateQuiz = async(Detail)=>{
    try {
        const {data} = await axios.put('/api/user/quiz', Detail);
        console.log(data);
    } catch (error) {
        console.log(error,error.message);
    }
}