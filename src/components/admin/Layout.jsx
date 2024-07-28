"use client"
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GridLoader } from 'react-spinners';

const Layout = ({ children }) => {

  const router = useRouter();

  const {isAdmin,loading} = useSelector(state => state.admin);
  if(!isAdmin) return router.push('/raithan-add/login');  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        {<main className="p-4 flex-1 h-full overflow-auto">{loading?<div  className='h-full flex justify-center items-center'><GridLoader
  color="#a13bda"
  loading
  margin={30}
  size={50}
  speedMultiplier={3}
/> </div>:children}</main>}
      </div>
    </div>
  );
};

export default Layout;
