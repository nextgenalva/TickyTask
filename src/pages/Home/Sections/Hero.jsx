import React from 'react';
import { BiSolidZap } from "react-icons/bi";

const Hero = () => {
    return (
        <div className="py-12 bg-gradient-to-br from-blue-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* New Updates badge */}
                <div className="flex justify-center mb-8 tracking-tight">
                    <div className="border-2 border-gray-200 rounded-xl py-3 px-3 flex items-center gap-2">
                        <span className="text-blue-500">
                            <BiSolidZap />
                        </span>
                        <span className="text-blue-500 font-semibold">New Updates</span>
                        <span className="text-gray-600 font-medium">Discover what is fresh in</span>
                        <span className="text-pink-500 font-semibold">version 2.1</span>
                    </div>
                </div>

                {/* Main heading */}
                <div className="text-center mb-3">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        Organize Your Notes,
                    </h1>
                    <h1 className="text-5xl md:text-6xl font-bold mt-2 tracking-tight">
                        Tasks, and <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Projects</span>
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="text-gray-600 text-center max-w-5xl mx-auto mt-4">
                    Manage everything seamlessly and boost productivity, whether working solo or collaborating with a team.
                </p>

                {/* CTA buttons */}
                <div className="flex justify-center gap-4 my-8">
                    <button className="btn btn-lg btn-neutral text-white rounded-lg shadow-sm font-medium">
                        Get started today
                    </button>
                    <button className="btn btn-lg px-6 border-none rounded-lg shadow text-gray-800 font-medium">
                        Learn more
                    </button>

                </div>

                {/* Dashboard preview */}
                <div className="relative mx-auto max-w-5xl">
                    {/* Decorative elements */}
                    <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-blue-300/20 to-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-purple-500/20 rounded-full blur-3xl"></div>

                    {/* Image container with shadow and border effect */}
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white/30 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-pink-500/5"></div>

                        {/* The actual dashboard image */}
                        <img
                            src="/src/assets/Screenshot 2025-04-09 233927.png"
                            alt="TickyTask Dashboard Interface"
                            className="w-full h-auto rounded-xl shadow-inner object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/api/placeholder/1200/800";
                            }}
                        />

                        {/* Overlays for design effect */}
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none"></div>
                        <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
                        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>

                    {/* Browser dots decoration at top */}
                    <div className="absolute top-3 left-4 flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;