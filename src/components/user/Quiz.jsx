"use client"
import { UpdateQuestion, UpdateQuiz } from "@/utils/UserActions";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import ModalImage from "react-modal-image";

const questionss = [
  // Your questions array
];

export default function Quiz({ questions = questionss, name, quizId, userId }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(questions[currentQuestion].timer * 60); // 1 minute for each question
  const [score, setScore] = useState(null);
  const [result, setResult] = useState({ right: 0, wrong: 0, notAttempted: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    const selectedOptionKey = Object.keys(questions[currentQuestion].options)[selectedOptions[currentQuestion]];

    UpdateQuestion({ questionId: questions[currentQuestion]._id, option: selectedOptionKey });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timer * 60); // reset timer for next question
    } else {
      handleSubmit();
    }
  }, [currentQuestion, questions, selectedOptions]);

  useEffect(() => {
    if (timeLeft === 0) {
      const newSelections = [...selectedOptions];
      newSelections[currentQuestion] = 4;
      setSelectedOptions(newSelections);
      handleNext();
    }
  }, [timeLeft, selectedOptions, currentQuestion, handleNext]);

  useEffect(() => {
    const newSelections = [...selectedOptions];
    questions.forEach((i, j) => {
      const userAnswer = i.users.find(user => user.id === userId)?.choosed;
      if (userAnswer && selectedOptions[j] !== null) {
        if (j < questions.length - 1) {
          setCurrentQuestion(j + 1);
          setTimeLeft(questions[j + 1].timer * 60); // reset timer for next question
        }
        switch (userAnswer) {
          case 'a':
            newSelections[j] = 0;
            setSelectedOptions(newSelections);
            break;
          case 'b':
            newSelections[j] = 1;
            setSelectedOptions(newSelections);
            break;
          case 'c':
            newSelections[j] = 2;
            setSelectedOptions(newSelections);
            break;
          case 'd':
            newSelections[j] = 3;
            setSelectedOptions(newSelections);
            break;
          default:
            newSelections[j] = 4;
            setSelectedOptions(newSelections);
            break;
        }
      }
    });
  }, [questions, userId, selectedOptions]);

  const handleOptionSelect = (index) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestion] = index;
    setSelectedOptions(newSelections);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    let getResult = { right: 0, wrong: 0, notAttempted: 0 };
    selectedOptions.forEach((option, index) => {
      const correctAnswer = questions[index].answer;
      const selectedOptionKey = Object.keys(questions[index].options)[option];
      if (selectedOptionKey === correctAnswer) {
        calculatedScore += 1;
        getResult.right += 1;
      } else if (selectedOptionKey === "e") {
        getResult.notAttempted += 1;
      } else {
        calculatedScore -= 0.25;
        getResult.wrong += 1;
      }
    });
    UpdateQuiz({ quizId, score: calculatedScore });
    setScore(calculatedScore);
    setResult(getResult);
  };

  if (score !== null) {
    return (
      <Result score={score} totalQuestions={questions.length} correctAnswers={result.right} incorrectAnswers={result.wrong} notAttempted={result.notAttempted} />
    );
  }

  return (
    <div className="px-4 sm:px-40 pt-12">
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="flex items-center justify-center gap-5 mb-4 sm:mb-0">
          <div className="bg-purple-600 w-16 h-16 rounded-lg flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer hover:scale-125 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p className="text-3xl">{name}</p>
            <p className="text-gray-300 font-light">
              {questions.length} Questions
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 px-2 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-purple-600"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>

          <p>{new Date(timeLeft * 1000).toISOString().substr(14, 5)}</p>
        </div>
      </div>

      <div className="py-14 px-4 sm:px-20">
        <div className="flex items-center gap-5">
          <div className="bg-purple-600 w-14 h-14 rounded-lg flex justify-center items-center">
            <p className="text-4xl font-mono">{currentQuestion + 1}</p>
          </div>
          {!questions[currentQuestion].questionUrl ? <p className="font-mono text-lg w-full sm:w-[80%]">
            {questions[currentQuestion].question}
          </p> : <div className="w-[80%]">
            <ModalImage
              small={questions[currentQuestion].questionUrl}
              large={questions[currentQuestion].questionUrl} // Replace with your actual image URL
              alt="question Image"
            />
          </div>}
        </div>

        <div className={`flex ${questions[currentQuestion].questionUrl || 'flex-col'} flex-wrap justify-evenly gap-5 pt-8 px-4 sm:px-10 text-xl`}>
          {Object.values(questions[currentQuestion].options).map(
            (option, index) => (
              <OptionDiv
                key={index}
                data={option}
                index={index + 1}
                onClick={() => handleOptionSelect(index)}
                isSelected={selectedOptions[currentQuestion] === index}
              />
            )
          )}
        </div>

        <div className="flex justify-between pt-8 px-4 sm:px-10">
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
            className="flex justify-center items-center gap-3 bg-purple-700 text-white py-2 px-5 rounded-md hover:bg-purple-800 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M20.03 11.47a.75.75 0 0 1 0 1.06l-8.25 8.25a.75.75 0 1 1-1.06-1.06L18.19 12 10.72 4.53a.75.75 0 0 1 1.06-1.06l8.25 8.25Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 11.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12A.75.75 0 0 1 3 11.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            className="flex justify-center items-center gap-3 bg-purple-700 text-white py-2 px-5 rounded-md hover:bg-purple-800 duration-300"
          >
            <span>{currentQuestion === questions.length - 1 ? "Submit" : "Next"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3.97 12.53a.75.75 0 0 1 0-1.06l8.25-8.25a.75.75 0 1 1 1.06 1.06L5.81 12l7.47 7.47a.75.75 0 0 1-1.06 1.06l-8.25-8.25Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M21 11.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionDiv({ data, index, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center gap-2 p-4 rounded-md cursor-pointer hover:scale-105 duration-300 ${
        isSelected
          ? "bg-purple-600 text-white"
          : "bg-purple-100 text-black"
      }`}
    >
      <span className="font-bold">{index}.</span>
      <span>{data}</span>
    </div>
  );
}

function Result({ score, totalQuestions, correctAnswers, incorrectAnswers, notAttempted }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
        <p className="mb-2">Score: {score}</p>
        <p className="mb-2">Total Questions: {totalQuestions}</p>
        <p className="mb-2">Correct Answers: {correctAnswers}</p>
        <p className="mb-2">Incorrect Answers: {incorrectAnswers}</p>
        <p className="mb-2">Not Attempted: {notAttempted}</p>
        <Link href="/">
          <button className="mt-4 bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 duration-300">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}


/* 
return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-800 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-5">{name}</h1>
      <div className="flex justify-between mb-4">
        <p>{currentQuestion + 1} / {questions.length} Questions</p>
        <p>Time Left: {new Date(timeLeft * 1000).toISOString().substr(14, 5)}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{questions[currentQuestion].question}</h2>
        <ul>
          {Object.values(questions[currentQuestion].options).map((option, index) => (
            <li
              key={index}
              className={`p-2 mt-2 border rounded cursor-pointer ${
                selectedOptions[currentQuestion] === index ? 'bg-green-500' : 'bg-gray-700'
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="bg-gray-600 p-2 rounded disabled:opacity-50"
          onClick={() => setCurrentQuestion((prev) => prev - 1)}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="bg-gray-600 p-2 rounded disabled:opacity-50"
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );*/


  // <div className="p-5 text-center">
      //   <h1 className="text-2xl font-bold">Quiz Result</h1>
      //   <p className="text-xl">Your score: {score}</p>
      //   <h2 className="text-xl mt-4 font-semibold">Correct Answers</h2>
      //   <ul className="list-disc list-inside">
      //     {questions.map((q, index) => (
      //       <li key={index}>
      //         {q.question} - {q.options[q.answer]}
      //       </li>
      //     ))}
      //   </ul>
      // </div>