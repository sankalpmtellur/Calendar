import React from 'react';

const CalendarHeader = ({ monthYear, onPrev, onNext }) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>&#8592;</button>
      <div id="month-year">{monthYear}</div>
      <button onClick={onNext}>&#8594;</button>
    </div>
  );
};

export default CalendarHeader;
