"use client";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Notfound from '../not-found';
import Quiz from '@/components/user/Quiz';

const page = ({params}) => {
    const quizId = params.id;
    const {quizes} = useSelector(state => state.user);

    const [quiz, setQuiz] = useState(null);

    // console.log(quiz)

    useEffect(()=>{
        console.log(quizId)
         {quizes && quizes.map(i => i._id === quizId && setQuiz(i))}
    },[quizId, setQuiz,quiz,quizes]);

    if(!quiz){
        return <Notfound />;
    }

  return (
    <div>
      <Quiz questions={quiz.questions} />
    </div>
  )
}

export default page
