"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Notfound from '../../not-found';
import Quiz from '@/components/user/Quiz';

const Page = ({ params }) => {
  const quizId = params.id;
  const { quizes } = useSelector((state) => state.user);

  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // console.log('quizId:', quizId);
    // console.log('quizes:', quizes);

    if (quizes) {
      const foundQuiz = quizes.find((i) => i._id === quizId);
      // console.log('foundQuiz:', foundQuiz);
      setQuiz(foundQuiz);
      // console.log(foundQuiz)
    }
  }, [quizId, quizes]);

  if (!quiz || quiz?.questions.length < 1) {
    return <Notfound />;
  }

  return (
    <div>
      {quiz && quiz.questions.length > 0 && <Quiz questions={quiz.questions} name={quiz.name} quizId={quiz._id} />}
    </div>
  );
};

export default Page;
