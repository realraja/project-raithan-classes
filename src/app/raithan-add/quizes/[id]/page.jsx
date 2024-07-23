"use client"
import Layout from '@/components/admin/Layout';
import AddButton from '@/components/Basics/AddButton';
import AddQuiz from '@/components/Dialogs/AddQuiz';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Page = ({params}) => {
    const {id} = params;

    const {questions} = useSelector(state => state.admin);
    const [confirmShowAdd, setConfirmShowAdd] = useState(false);
    const [mounted, setMounted] = useState(false);
  
    // console.log(courses)
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;
    
  return (
    <div>
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
          text={"Add Question"}
        />

        <div className="w-full flex flex-wrap justify-center gap-5 p-4 my-4 cursor-pointer">
          {questions && questions.map((i,v)=>{
            return(
                i.for.includes(id) && <CoursesCard key={v}  name={i.question} timer={i.timer}  date={i.createdAt}  />
          )})}

          </div>

      </div>

      <AddQuiz
        confirmState={confirmShowAdd}
        setConfirmState={setConfirmShowAdd}
      />
    </Layout>
    </div>
  )
}

export default Page



const CoursesCard = ({name,timer, date}) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-64">
        <h1 className="text-3xl text-purple-600 font-bold mb-2 text-center">{name}</h1>
        <ul className="list-disc list-inside">
          <li className="mb-2">{timer} Minutes</li>
        </ul>
        <span className="text-gray-400 text-right">Time : {moment(date).fromNow()}</span>
      </div>
    );
  }