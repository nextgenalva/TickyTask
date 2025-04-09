import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className=''>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;