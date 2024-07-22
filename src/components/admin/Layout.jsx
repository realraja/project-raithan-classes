"use client"
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {

  const router = useRouter();

  const {isAdmin,loading} = useSelector(state => state.admin);

  useEffect(() => {
  if(!isAdmin) return router.push('/raithan-add/login');  
  }, [router,isAdmin])
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        {loading?<h1>Loadind....</h1> :<main className="p-4 flex-1 h-full overflow-auto">{children}</main>}
      </div>
    </div>
  );
};

export default Layout;