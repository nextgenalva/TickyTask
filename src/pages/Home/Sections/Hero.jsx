import Navbar from '../../../Shared/Navbar';
import React from 'react';
import { BiSolidZap } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div>
            <Navbar />
            <div className="py-12 bg-gradient-to-br from-blue-50 to-pink-50">
                <div className="max-w-6xl mx-auto px-4">
                    {/* New Updates badge */}
                    <div className="flex justify-center mb-8 w-full px-4">
                        <div className="border-2 border-gray-200 rounded-xl py-2 px-3 md:py-3 md:px-4 flex items-center gap-1 md:gap-2 w-full max-w-md md:max-w-lg">
                            <h1 className="text-gray-600 font-medium text-xs md:text-base flex flex-wrap items-center justify-center w-full">
                                <span className="text-blue-500 flex items-center mr-1">
                                    <BiSolidZap size={16} className="inline mr-1" />
                                </span>
                                <span className="text-blue-500 font-semibold mr-1">New Updates</span>
                                <span className="text-gray-600 font-medium mr-1">Discover what is fresh in</span>
                                <span className="text-pink-500 font-semibold">v1.0</span>
                            </h1>
                        </div>
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
                        {/* Main heading */}
                        <div className="text-center mb-4 md:mb-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Organize Your Notes,
                            </h1>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-1 md:mt-2 tracking-tight">
                                Tasks, and <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Projects</span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="text-gray-600 text-center text-sm sm:text-base md:text-lg max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto mt-2 md:mt-4">
                            Manage everything seamlessly and boost productivity, whether working solo or collaborating with a team.
                        </p>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 my-6 md:my-8">
                            <Link to='/login' className="btn btn-lg btn-neutral text-white rounded-lg shadow-sm font-medium text-sm sm:text-base py-2 px-4 sm:px-6">
                                Get started today
                            </Link>
                            <button className="btn btn-lg border-none rounded-lg shadow text-gray-800 font-medium text-sm sm:text-base py-2 px-4 sm:px-6 mt-2 sm:mt-0">
                                Learn more
                            </button>
                        </div>
                    </div>

                    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 md:px-8 my-8 md:my-16">
                        {/* Decorative elements - adjusted for different screen sizes */}
                        <div className="absolute -z-10 -top-4 -left-4 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-full blur-2xl md:blur-3xl"></div>
                        <div className="absolute -z-10 -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-pink-300/20 to-purple-500/20 rounded-full blur-2xl md:blur-3xl"></div>

                        {/* Image container with shadow and border effect */}
                        <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl md:shadow-2xl border border-white/20 bg-white/30 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-pink-500/5"></div>

                            {/* The actual dashboard image */}
                            <img
                                src="/dashboard.png"
                                alt="TickyTask Dashboard Interface"
                                className="w-full h-auto rounded-lg sm:rounded-xl shadow-inner object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/api/placeholder/1200/800";
                                }}
                            />

                            {/* Overlays for design effect */}
                            <div className="absolute inset-0 border border-white/10 rounded-lg sm:rounded-xl pointer-events-none"></div>
                            <div className="absolute top-0 w-full h-8 sm:h-12 md:h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
                            <div className="absolute bottom-0 w-full h-8 sm:h-12 md:h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* Browser dots decoration at top - adjusted size for mobile */}
                        <div className="absolute top-2 sm:top-3 left-3 sm:left-4 flex space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;