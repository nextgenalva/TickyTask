import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Private</h2>
            <ul className="space-y-2">
                <li className="flex items-center gap-2"><span>🏠</span> Home</li>
                <li className="flex items-center gap-2">✅ Completed</li>
                <li className="flex items-center gap-2">👤 Personal</li>
                {/* Add more... */}
            </ul>
            <button className="btn btn-sm mt-4 w-full">+ Create new list</button>

            <h2 className="text-xl font-bold mt-8 mb-4">Group</h2>
            <div className="space-y-2">
                <div className="p-2 bg-gray-100 rounded flex items-center gap-2">👥 Mobal Project</div>
                <div className="p-2 bg-gray-100 rounded flex items-center gap-2">👥 Futur Project</div>
            </div>
            <button className="btn btn-sm mt-4 w-full">+ Create new group</button>
        </aside>
    );
};

export default Sidebar;