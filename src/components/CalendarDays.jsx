import React from 'react';

const CalendarDays = ({ date, today, onSelectDate }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`}></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${month + 1}-${d}`;
    const isToday =
      today.getDate() === d &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    calendarCells.push(
      <div
        key={d}
        className={isToday ? 'today' : ''}
        onClick={() => onSelectDate(dateKey)}
      >
        <span>{d}</span>
      </div>
    );
  }

  return <div className="calendar-days">{calendarCells}</div>;
};

export default CalendarDays;
