import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BeatLoader } from "react-spinners";

const AddStudent = ({ confirmState, setConfirmState, runFunction }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddStudent = async () => {
    // console.log(token,username,password,name)
    setLoading(true);

    //   try {
    //       const {data} = await axios.post('/api/allstudents',{
    //           name,username,password,userusername:token
    //       })

    //       if(data.success){
    //           toast.success(data.message);
    //           setLoading(false);
    //           setConfirmState(false);
    //           runFunction()
    //       }else{
    //           toast.error(data.message);
    //           setLoading(false);
    //       }
    //   } catch (error) {
    //       console.log(error);
    //       toast.error(error.message);
    //       setLoading(false);
    //   }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={confirmState} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setConfirmState(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-husernameden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 w-full  sm:max-w-lg">
                <div className="bg-gray-800 px-4 pb-4 pt-5 rounded-lg sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mx-auto flex h-16 w-16 text-purple-500 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 hover:scale-150 duration-300"
                      >
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-purple-500"
                      >
                        Add A New student
                      </Dialog.Title>
                      <div className="m-5 text-sm text-white">
                        <p className=" text-white  bg-gray-800 px-2  absolute z-0 -mt-3 ml-1 rounded">
                          Name
                        </p>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-700 border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md"
                          type="text"
                          placeholder="enter here student name"
                        />
                      </div>
                      <div className="m-5 text-sm text-white">
                        <p className=" text-white  bg-gray-800 px-2  absolute z-0 -mt-3 ml-1 rounded">
                          username
                        </p>
                        <input
                          value={username}
                          onChange={(e) =>
                            setUsername(
                              e.target.value.toLowerCase().replaceAll(" ", "-")
                            )
                          }
                          className="w-full bg-gray-700  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md"
                          type="text"
                          placeholder="enter here student username"
                        />
                      </div>
                      <div className="m-5 text-sm text-white">
                        <p className=" text-white  bg-gray-800 px-2  absolute z-0 -mt-3 ml-1 rounded">
                          password:
                        </p>
                        <input
                          value={password}
                          onChange={(e) =>
                            setPassword(
                              e.target.value.toLowerCase().replaceAll(" ", "-")
                            )
                          }
                          className="w-full bg-gray-700  border focus:outline-none focus:border-white p-2 m-0  text-base block border-gray-700 rounded-md"
                          type="text"
                          placeholder="enter here student password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                    onClick={handleAddStudent}
                  >
                    <div className="flex justify-center items-center">
                      {loading ? (
                        <BeatLoader className=" self-center" color="white" />
                      ) : (
                        "Add student"
                      )}
                    </div>
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setConfirmState(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddStudent;
