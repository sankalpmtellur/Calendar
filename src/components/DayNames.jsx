import React from 'react';

const DayNames = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="day-names">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default DayNames;
