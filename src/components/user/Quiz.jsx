import { useState, useEffect } from 'react';

const questionss = [
  {
    options: {
      a: "kldka",
      b: "kasldk",
      c: "lksadlk",
      d: "lsdkas",
      e: "Not Attempted"
    },
    question: "lkrek",
    answer: "b",
    timer: 4
  },
  {
    options: {
      a: "kldka",
      b: "kasldk",
      c: "lksadlk",
      d: "lsdkas",
      e: "Not Attempted"
    },
    question: "lkrek\n\n",
    answer: "b",
    timer: 4
  },
  {
    options: {
      a: "kldka",
      b: "kasldk",
      c: "lksadlk",
      d: "lsdkas",
      e: "Not Attempted"
    },
    question: "lkrek\n\n",
    answer: "b",
    timer: 4
  },
  {
    options: {
      a: "kldka",
      b: "kasldk",
      c: "lksadlk",
      d: "lsdkas",
      e: "Not Attempted"
    },
    question: "lkrek\n\n",
    answer: "b",
    timer: 4
  },
  {
    options: {
      a: "real",
      b: "fack ",
      c: "mango",
      d: "tea",
      e: "Not Attempted"
    },
    question: "this is test question",
    answer: "d",
    timer: 3
  },
  {
    options: {
      a: "option 1",
      b: "option 2",
      c: "option 3",
      d: "option 4",
      e: "Not Attempted"
    },
    question: "test question 2",
    answer: "a",
    timer: 1
  },
  {
    options: {
      a: "option 1",
      b: "option 2",
      c: "option 3",
      d: "option 4",
      e: "Not Attempted"
    },
    question: "test question 1",
    answer: "c",
    timer: 1
  }
];

export default function Quiz({questions = questionss}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute for each question
  const [score, setScore] = useState(null);

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

  useEffect(() => {
    if (timeLeft === 0) handleNext();
  }, [timeLeft]);

  const handleOptionSelect = (index) => {
    const newSelections = [...selectedOptions];
    newSelections[currentQuestion] = index;
    setSelectedOptions(newSelections);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60); // reset timer for next question
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    selectedOptions.forEach((option, index) => {
      const correctAnswer = questions[index].answer;
      const selectedOptionKey = Object.keys(questions[index].options)[option];
      if (selectedOptionKey === correctAnswer) {
        calculatedScore += 1;
      } else if (selectedOptionKey === 'e') {
        // Do nothing for not attempted questions
      } else {
        calculatedScore -= 0.25;
      }
    });
    setScore(calculatedScore);
  };

  if (score !== null) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold">Quiz Result</h1>
        <p className="text-xl">Your score: {score}</p>
        <h2 className="text-xl mt-4 font-semibold">Correct Answers</h2>
        <ul className="list-disc list-inside">
          {questions.map((q, index) => (
            <li key={index}>
              {q.question} - {q.options[q.answer]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-5 bg-gray-800 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-5">React Quiz</h1>
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
  );
}
