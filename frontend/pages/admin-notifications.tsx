import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminNotifications = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    image: '',
    link: '',
    date: '',
    time: '',
    repeat: false,
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/notifications/history');
      setHistory(res.data);
    } catch (error) {
      console.error('Error al obtener historial de notificaciones:', error);
    }
  };

  const scheduleNotification = async () => {
    try {
      await axios.post('/api/notifications/schedule', notification);
      alert('Notificación programada con éxito.');
      fetchHistory();
      setNotification({ title: '', message: '', image: '', link: '', date: '', time: '', repeat: false });
    } catch (error) {
      console.error('Error al programar la notificación:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Notificaciones</h1>

      <h2>Programar Notificación</h2>
      <div className="mb-3">
        <label>Título</label>
        <input
          type="text"
          value={notification.title}
          onChange={(e) => setNotification({ ...notification, title: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Mensaje</label>
        <textarea
          value={notification.message}
          onChange={(e) => setNotification({ ...notification, message: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Imagen o GIF (URL)</label>
        <input
          type="text"
          value={notification.image}
          onChange={(e) => setNotification({ ...notification, image: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Enlace</label>
        <input
          type="text"
          value={notification.link}
          onChange={(e) => setNotification({ ...notification, link: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Fecha</label>
        <input
          type="date"
          value={notification.date}
          onChange={(e) => setNotification({ ...notification, date: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Hora</label>
        <input
          type="time"
          value={notification.time}
          onChange={(e) => setNotification({ ...notification, time: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          checked={notification.repeat}
          onChange={(e) => setNotification({ ...notification, repeat: e.target.checked })}
          className="form-check-input"
        />
        <label className="form-check-label">Repetir</label>
      </div>
      <button onClick={scheduleNotification} className="btn btn-primary">Programar Notificación</button>

      <hr />

      <h2>Historial de Notificaciones</h2>
      <ul className="list-group">
        {history.map((item) => (
          <li key={item.id} className="list-group-item">
            <h5>{item.title}</h5>
            <p>{item.message}</p>
            {item.image && <img src={item.image} alt="Notificación" style={{ maxWidth: '100px' }} />}
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Ver más</a>}
            <small>Programada para: {new Date(item.date).toLocaleDateString()} {item.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotifications;
