import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MiniCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/calendar/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    }
  };

  return (
    <div className="mini-calendar">
      <h3>Calendario</h3>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item">
            <strong>{event.title}</strong>
            <p>{event.description}</p>
            <small>{new Date(event.date).toLocaleDateString()} {event.time}</small>
            {event.link && (
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                Ver Clase
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MiniCalendar;
