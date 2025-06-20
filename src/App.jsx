import React, { useState } from 'react';
import './index.css';

import CalendarHeader from './components/CalendarHeader';
import DayNames from './components/DayNames';
import CalendarDays from './components/CalendarDays';
import EventModal from './components/EventModal';

const App = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem('calendarEvents')) || {};
  });

  const monthYear = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const saveEvents = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const handleAddEvent = (eventText) => {
    if (!eventText.trim() || !selectedDate) return;
    const updated = { ...events };
    if (!updated[selectedDate]) updated[selectedDate] = [];
    updated[selectedDate].push(eventText.trim());
    saveEvents(updated);
  };

  const handleDeleteEvent = (index) => {
    if (!selectedDate) return;
    const updated = { ...events };
    updated[selectedDate].splice(index, 1);
    if (updated[selectedDate].length === 0) delete updated[selectedDate];
    saveEvents(updated);
  };

  const handleDeleteAll = () => {
    if (!selectedDate) return;
    const updated = { ...events };
    delete updated[selectedDate];
    saveEvents(updated);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        monthYear={monthYear}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <DayNames />

      <CalendarDays
        date={currentDate}
        today={today}
        onSelectDate={(dateKey) => setSelectedDate(dateKey)}
      />

      <EventModal
        dateKey={selectedDate}
        events={events}
        onClose={() => setSelectedDate(null)}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
};

export default App;
