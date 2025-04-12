import React from 'react';

const TaskCard = ({ title, time, tags, users }) => {
    return (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span>{title}</span>
                {tags && <span className="badge badge-outline badge-sm">{tags}</span>}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
                {users && users.map((user, idx) => (
                    <img key={idx} src={user} className="w-6 h-6 rounded-full border" />
                ))}
                <span>🕒 {time}</span>
            </div>
        </div>
    );
};

export default TaskCard;