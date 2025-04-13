import React from 'react';

const Topbar = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white shadow-sm">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Good Morning, Sullivan! 👋</h1>
          <p className="text-gray-500">Today, {formattedDate}</p>
        </div>
        <div className="dropdown dropdown-end">
          <button className="btn btn-outline btn-sm">Today</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;