'use client';

import { useState } from 'react';

import Header from './components/Header';
import SideBar from './components/SideBar';

const Dashboard = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div>
      <Header />
      <SideBar isOpen={isOpen} setOpen={setOpen} />
      <div
        className=" min-h-[max(675px,100vh-75px)] pb-[100px] min-w-full md:min-w-[calc(100%-250px)] p-4"
        style={{
          marginLeft: isOpen ? '250px' : 0,
          // transitionDuration: '3s',
        }}
      >
        dashboard here
      </div>
    </div>
  );
};

export default Dashboard;
