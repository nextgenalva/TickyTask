'use client';
import React, { useEffect, useRef, useState } from 'react';

const Topbar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Attach listener to calendar after it's mounted
  useEffect(() => {
    const calendar = calendarRef.current;

    const handleDateClick = (e) => {
      const value = e.target?.getAttribute('value');
      if (value) {
        const newDate = new Date(value);
        setSelectedDate(newDate);
      }
    };

    calendar?.addEventListener('click', handleDateClick);
    return () => {
      calendar?.removeEventListener('click', handleDateClick);
    };
  }, []);

  return (
    <div className="bg-white shadow-sm">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Good Morning, Sullivan! 👋</h1>
          <p className="text-gray-500">Today, {formattedDate}</p>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-neutral btn-sm">
            {selectedDate.toDateString() === new Date().toDateString()
              ? 'Today'
              : selectedDate.toLocaleDateString()}
          </label>

          <div
            tabIndex={0}
            className="dropdown-content z-[10] mt-2 bg-base-100 border border-base-300 shadow-lg rounded-box p-4"
          >
            <calendar-date
              ref={calendarRef}
              class="cally w-72 bg-base-100 border border-base-300 rounded-box shadow"
            >
              <svg
                aria-label="Previous"
                className="fill-current size-4"
                slot="previous"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <svg
                aria-label="Next"
                className="fill-current size-4"
                slot="next"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <calendar-month></calendar-month>
            </calendar-date>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
