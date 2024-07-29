import { getUserQuiz } from "@/redux/slices/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";


const dispatch = useDispatch();

export const getQuizes = async()=>{
    try {
      const {data} = await axios.post('/api/user/get-quiz-data',{courseId:selectedCourse._id});
      console.log(data);
      await dispatch(getUserQuiz(data.data.quizes));

    } catch (error) {
      console.log(error);
    }
  }