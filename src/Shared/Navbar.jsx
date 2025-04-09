import React from 'react';
import { ShimmerButton } from '../components/magicui/shimmer-button';

const Navbar = () => {
    return (
        <div className="w-7/12 mx-auto">
            <div className="navbar bg-base-300 shadow-sm rounded-lg my-2">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl rounded-lg">TickyTask</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-2">
                        <ShimmerButton rippleColor="173, 216, 230" className="btn rounded-lg">Login</ShimmerButton>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;