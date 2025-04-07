import React from 'react';

const Navbar = () => {
    return (
        <div className='w-7/12 mx-auto'>
            <div className="navbar bg-base-300 shadow-sm rounded-full my-2">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl rounded-full">TickyTask</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <button className="btn btn-soft btn-primary rounded-full">Login</button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;