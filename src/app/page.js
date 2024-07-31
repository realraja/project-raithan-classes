"use client";
import SelectCourse from '@/components/user/SelectCourse';
import { getUserQuiz } from '@/redux/slices/userSlice';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const {quizes,user} = useSelector(state => state.user);
  const [selectedCourse, setSelectedCourse ] = useState({})
  // console.log(selectedCourse)

  const getQuizes = async()=>{
    try {
      const {data} = await axios.post('/api/user/get-quiz-data',{courseId:selectedCourse._id});
      await dispatch(getUserQuiz(data));
      // console.log(data);

    } catch (error) {
      console.log(error);
      error.response ?toast.error(error.response.data.message):toast.error(error.message);
    }
  }
  
  
  useEffect(()=>{
    getQuizes();
  },[selectedCourse,setSelectedCourse])
  return (<div className='App'>
    <div className='items-center mx-20'>
{ user?.courses && <SelectCourse data={user.courses} setSelectedData={setSelectedCourse} />}
  {/* {courses && courses[0].subjects.length>0 && <SelectCourse data={courses[0].subjects} setSelectedData={(data)=>{console.log(data)}}  />} */}

    </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quizes && quizes.map((i) => (
          <QuizCard key={i._id} quiz={i} />
        ))}
      </div>
    </div>
    </div>
  );
}


const QuizCard = ({ quiz }) => {
  return (
    <Link href={`/start-quiz/${quiz._id}`}>
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-black">{quiz.name}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4-7a7 7 0 100 14 7 7 0 000-14z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600">{quiz?.questions.length} question(s)</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Success rate: {quiz.successRate}%</span>
        <button className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zM10 5a1 1 0 00-1 1v2a1 1 0 102 0V6a1 1 0 00-1-1z" />
          </svg>
        </button>
      </div>
    </div>
    </Link>
  );
};
