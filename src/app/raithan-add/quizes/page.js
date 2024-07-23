"use client";
import Layout from "@/components/admin/Layout";
import AddButton from "@/components/Basics/AddButton";
import AddQuiz from "@/components/Dialogs/AddQuiz";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { quizes } = useSelector((state) => state.admin);

  // console.log(courses)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <AddButton
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          }
          runFunction={() => setConfirmShowAdd(true)}
          text={"Add Quizes"}
        />

        <div className="w-full flex flex-wrap justify-center gap-5 p-4 my-4 cursor-pointer">
          {quizes && quizes.map((i,v)=>(
            <CoursesCard key={v} id={i._id} name={i.name} subjects={i.forSubject.length} questions={i.questions.length} courses={i.forCourse.length} date={i.createdAt}  />
          ))}

          </div>

      </div>

      <AddQuiz
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </Layout>
  );
};

export default Page;



const CoursesCard = ({id,name, subjects, courses,questions, date}) => {
  const router = useRouter();
  return (
    <div onClick={()=> router.push(`quizes/${id}`)} className="bg-gray-800 p-6 rounded-lg shadow-lg w-64">
      <h1 className="text-3xl text-purple-600 font-bold mb-2 text-center">{name}</h1>
      <ul className="list-disc list-inside">
        <li className="mb-2">{questions} questions</li>
        <li className="mb-2">{courses} Courses</li>
        <li className="mb-2">{subjects} Subjects</li>
      </ul>
      <span className="text-gray-400 text-right">Time : {moment(date).fromNow()}</span>
    </div>
  );
}

