import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header />
        <main className="p-4 flex-1 h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
