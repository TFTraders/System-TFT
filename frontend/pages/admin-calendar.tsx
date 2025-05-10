import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', link: '', date: '', time: '' });

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

  const createEvent = async () => {
    try {
      await axios.post('/api/calendar/create', newEvent);
      fetchEvents();
      setNewEvent({ title: '', description: '', link: '', date: '', time: '' });
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/calendar/delete/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión del Calendario</h1>

      <h2>Crear Evento</h2>
      <div className="mb-3">
        <label>Título</label>
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label>
        <textarea
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Enlace</label>
        <input
          type="text"
          value={newEvent.link}
          onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Fecha</label>
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Hora</label>
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          className="form-control"
        />
      </div>
      <button onClick={createEvent} className="btn btn-primary">Crear Evento</button>

      <hr />

      <h2>Eventos Programados</h2>
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
            <button onClick={() => deleteEvent(event.id)} className="btn btn-danger btn-sm mt-2">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCalendar;
