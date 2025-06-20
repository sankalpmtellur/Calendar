import React, { useState, useEffect } from 'react';

const EventModal = ({ dateKey, events, onClose, onAddEvent, onDeleteEvent, onDeleteAll }) => {
  const [eventInput, setEventInput] = useState('');

  const handleAdd = () => {
    if (eventInput.trim()) {
      onAddEvent(eventInput);
      setEventInput('');
    }
  };

  useEffect(() => {
    setEventInput('');
  }, [dateKey]);

  if (!dateKey) return null;

  const currentEvents = events[dateKey] || [];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 id="modal-date-title">Events on {dateKey}</h3>

        <input
          type="text"
          id="event-input"
          placeholder="Add new event"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button id="add-event-btn" onClick={handleAdd}>➕ Add</button>

        <ul id="event-list">
          {currentEvents.length === 0 ? (
            <li style={{ textAlign: 'center', color: '#888' }}>No events yet.</li>
          ) : (
            currentEvents.map((event, index) => (
              <li key={index}>
                <span>{event}</span>
                <button onClick={() => onDeleteEvent(index)}>❌</button>
              </li>
            ))
          )}
        </ul>

        {currentEvents.length > 1 && (
          <button
            onClick={onDeleteAll}
            style={{
              marginTop: '12px',
              padding: '8px 12px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            🗑️ Delete All
          </button>
        )}

        <div className="modal-footer">
          <button id="close-modal" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
