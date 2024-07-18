import React from 'react';
import { HomeIcon, UserGroupIcon, BookOpenIcon, CurrencyDollarIcon, CogIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-full w-1/5">
      <div className="p-4 text-xl font-bold">Raithan Classes</div>
      <nav className="mt-4">
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <UserGroupIcon className="h-5 w-5 mr-2" /> Students
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <BookOpenIcon className="h-5 w-5 mr-2" /> Courses
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <CurrencyDollarIcon className="h-5 w-5 mr-2" /> Fees
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <CogIcon className="h-5 w-5 mr-2" /> Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
