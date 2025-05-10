import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminGeneralAI = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/general-ai/history');
      setHistory(res.data);
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  };

  const sendCommand = async () => {
    try {
      const res = await axios.post('/api/general-ai/command', { command });
      setResponse(res.data.response);
      fetchHistory();
    } catch (error) {
      console.error('Error al enviar el comando:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Panel de Comandos - IA General</h1>
      <textarea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Escribe un comando para la IA General..."
        className="form-control mb-3"
      />
      <button onClick={sendCommand} className="btn btn-primary">Enviar Comando</button>

      {response && (
        <div className="mt-4">
          <h2>Respuesta de la IA</h2>
          <pre>{response}</pre>
        </div>
      )}

      <hr />

      <h2>Historial de Comandos</h2>
      <ul className="list-group">
        {history.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>Comando:</strong> {item.command}
            <br />
            <strong>Respuesta:</strong> {item.response}
            <br />
            <small>Ejecutado el: {new Date(item.executedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminGeneralAI;
