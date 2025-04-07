import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;