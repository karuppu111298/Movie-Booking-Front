import React from 'react';
import { Outlet } from 'react-router-dom';



import Header from '.././common/front/header';
import Footer from '.././common/front//footer';


const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
