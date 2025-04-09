import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="font-extrabold text-2xl tracking-tight">
                        <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Ticky</span>
                        <span>Task</span>
                    </Link>

                    {/* Login Button */}
                    <Link to="/login" className="btn btn-neutral rounded-lg text-white font-medium">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;