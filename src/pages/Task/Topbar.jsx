import React from 'react';

const Topbar = () => {
    return (
        <div className="flex justify-between items-center px-4 py-2 border-b">
            <div>
                <h1 className="text-lg font-semibold">Good Morning, Sullivan 👋</h1>
                <p className="text-sm text-gray-500">Today, Wed 26 July 2023</p>
            </div>
            <div>
                <button className="btn btn-sm">Today</button>
            </div>
        </div>
    );
};

export default Topbar;