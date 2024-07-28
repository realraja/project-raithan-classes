"use client"
import React, { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BellIcon } from '@heroicons/react/outline';
import {  useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import ConfirmButton from '../Dialogs/ConfirmButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { checkUser } from '@/redux/actions/userActions';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {isAdmin} = useSelector(state => state.admin);
  const {isUser} = useSelector(state => state.user);
  
  const [isOpen, setIsOpen] = useState(false);
  
    const logoutHandle = async ()=>{
      try {
        const {data} = await axios.get('/api/logout');
        await dispatch(checkUser());
        toast.success(data.message);
      } catch (error) {
        console.log(error);
        error.response ?toast.error(error.response.data.message):toast.error(error.message);
      }
    }


    useEffect(() =>{      
      if(!isUser) return router.push('/login');
    },[router,isUser]);

  return (
    <nav className="bg-gray-800 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
         
          <div className="flex flex-1 items-center sm:items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center ">
              <img
                className="h-16 w-auto"
                src="/Logo_Design_Template-removebg-preview.png"
                alt="Your Company"
              />
              <span className='text-3xl sm:block font-serif font-extralight'>Raithan Classes</span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://res.cloudinary.com/dwc3gwskl/image/upload/v1721379013/samples/ecommerce/fiiijyy4cq1nrcp7t4zz.jpg"
                    alt="user"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  {isAdmin && <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/raithan-add"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Admin View
                      </Link>
                    )}
                  </Menu.Item>}
                  <Menu.Item>
                    {({ active }) => (
                      <p
                      onClick={()=> setIsOpen(true)}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Sign out
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <ConfirmButton confirmState={isOpen} setConfirmState={setIsOpen} runFunction={logoutHandle} buttonText={'Logout'} />
    </nav>
  );
};

export default Navbar;
