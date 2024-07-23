// "use client"
import { logoutAction } from "@/redux/slices/adminSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ConfirmButton from "../Dialogs/ConfirmButton";
import AddStudent from "../Dialogs/AddStudent";
import AddButton from "../Basics/AddButton";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmShowLogout, setConfirmShowLogout] = useState(false);
  const [confirmShowAdd, setConfirmShowAdd] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/admin/logout");
      await dispatch(logoutAction());
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  return (<>
      <header className="bg-gray-900 text-white p-4 flex justify-end items-center gap-3">
        <div className="flex justify-center items-center gap-4 mx-3">
          <AddButton icon={<path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />} runFunction={()=> setConfirmShowAdd(true)} text={"Add Student"} />
          <button
            onClick={() => setConfirmShowLogout(true)}
            className="active:scale-105 duration-75 inline-flex items-center justify-center text-white  overflow-hidden  font-medium  rounded-lg group bg-gradient-to-r from-purple-600 to-rose-500 group-hover:from-purple-600 group-hover:to-rose-500 hover:text-white  focus:outline-none "
          >
            <span className="flex justify-center items-center px-5 py-2 transition-all ease-in duration-75 bg-rose-700 hover:text-gray-300 rounded-md group-hover:bg-opacity-0">
              {/* <AiFillStar className="w-6 h-6 mr-1" /> */}
              <span>LogOut</span>
            </span>
          </button>
        </div>
      </header>
        <ConfirmButton
          confirmState={confirmShowLogout}
          setConfirmState={setConfirmShowLogout}
          runFunction={logoutHandler}
          buttonText={"LogOut"}
        />
        <AddStudent confirmState={confirmShowAdd} setConfirmState={setConfirmShowAdd} />
      </>
  );
};

export default Header;
