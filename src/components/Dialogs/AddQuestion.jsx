import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { checkAdmin } from "@/redux/actions/adminActions";
import toast from "react-hot-toast";
import axios from "axios";

const AddQuestion = ({ isOpen, setIsOpen,quiz }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState("2");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( question,
        answer,
        quiz,
        timer,
        options);
    setLoading(true);
    try {
        const { data } = await axios.post('/api/admin/question', {
            question,
            answer,
            quiz,
            timer,
            options
        });
  
        toast.success(data.message);
        setIsOpen(false);
        await dispatch(checkAdmin());
        setLoading(false);
      } catch (error) {
        console.log(error);
        error.response ?toast.error(error.response.data.message):toast.error(error.message);
        setLoading(false);
      }
    setLoading(false);
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=> setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full overflow-auto items-end sm:items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full mx-4 sm:max-w-lg p-6 bg-gray-900 text-white rounded-lg shadow-xl">
                  <div className="flex justify-between items-center">
                    <Dialog.Title className="text-lg font-medium leading-6 text-purple-400">
                      Add Quiz Question
                    </Dialog.Title>
                    <button
                      className="text-gray-400 hover:text-gray-200"
                      onClick={()=> setIsOpen(false)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <textarea
                        className="w-[90%] mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text-sm font-medium">Options</label>
                      {['a', 'b', 'c', 'd'].map((opt) => (
                        <div key={opt} className="mt-1 flex justify-around items-center">
                          <label className="w-max font-medium">
                            {opt.toUpperCase()} :
                          </label>
                          <input
                            className="w-[90%] p-2 bg-gray-800 border border-gray-700 rounded"
                            type="text"
                            name={opt}
                            value={options[opt]}
                            onChange={handleOptionChange}
                            placeholder={`Enter option ${opt.toUpperCase()}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-5 mx-10 justify-center items-center">
                      <select
                        className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                      >
                        <option value="">Corect Option</option>
                        {['a', 'b', 'c', 'd'].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <select
                        className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 rounded"
                        value={timer}
                        onChange={(e) => setTimer(e.target.value)}
                        required
                      >
                        <option value="">Timer</option>
                        {['1', '2', '3', '4','5'].map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.toUpperCase()} Minutes 
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded"
                      >
                        {loading ? (
                        <BeatLoader className=" self-center" color="white" />
                      ) : (
                        'Add Question'
                      )}
    
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
};

export default AddQuestion;
