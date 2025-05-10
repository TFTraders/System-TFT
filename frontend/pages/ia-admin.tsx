import React, { useState } from 'react';
import axios from 'axios';

const IAAdmin = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) {
      alert('Por favor, escribe un mensaje.');
      return;
    }

    // Agregar el mensaje del usuario a la consola
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    try {
      // Enviar el mensaje al backend
      const res = await axios.post('/api/ia-commands/send', { command: input });

      // Agregar la respuesta de la IA a la consola
      setMessages((prev) => [...prev, { sender: 'ia', text: res.data.response }]);
    } catch (error) {
      console.error('Error al enviar el comando:', error);
      setMessages((prev) => [...prev, { sender: 'ia', text: 'Hubo un error al procesar tu solicitud.' }]);
    }

    setInput(''); // Limpiar el campo de entrada
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/ia-commands/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Archivo subido con éxito: ' + res.data.message);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un error al subir el archivo.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Administración de la IA</h1>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#1a202c',
          borderRadius: '10px',
          padding: '20px',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            height: '400px',
            overflowY: 'auto',
            background: '#2c2c2c',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                color: msg.sender === 'user' ? '#ffffff' : '#750e25',
                marginBottom: '10px',
              }}
            >
              <strong>{msg.sender === 'user' ? 'Tú' : 'IA'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            style={{
              flex: 1,
              resize: 'none',
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              background: '#1a202c',
              color: '#ffffff',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: '#750e25',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontWeight: '600',
              borderRadius: '5px',
            }}
          >
            Enviar
          </button>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            style={{ marginBottom: '10px', color: '#ffffff' }}
          />
          <button
            onClick={uploadFile}
            style={{
              backgroundColor: '#750e25',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontWeight: '600',
              borderRadius: '5px',
            }}
          >
            Subir Archivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default IAAdmin;
