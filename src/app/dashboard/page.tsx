'use client';

import { useState } from 'react';

import Header from './components/Header';
import Navigation from './components/Navigation';
import withAuth from '../components/withAuth';

const Dashboard = () => {
  const [isOpen, setOpen] = useState(true);

  return (
    <div>
      <Header />
      <Navigation isOpen={isOpen} setOpen={setOpen} />
      <div
        className=" min-h-[max(675px,100vh-75px)] pb-[100px] min-w-full md:min-w-[calc(100%-250px)] p-4"
        style={{
          marginLeft: isOpen ? '250px' : 0,
          padding: '30px',
        }}
      >
        dashboard here
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
