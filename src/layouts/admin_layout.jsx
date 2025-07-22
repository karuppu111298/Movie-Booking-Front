import React from 'react';
import { Outlet } from 'react-router-dom';


import Header from '.././common/back/header';
import Sidebar from '.././common/back/sidebar';
import Footer from '.././common/back//footer';

const AdminLayout = () => {
    return (
       
            <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                        <div className="flex-1" style={{ backgroundColor: '#ecf0fa', padding: '1.5rem' }}>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>

    );
};

export default AdminLayout;
