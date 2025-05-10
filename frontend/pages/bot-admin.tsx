import React, { useState } from 'react';
import axios from 'axios';

const BotAdmin = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) {
      alert('Por favor, escribe un mensaje.');
      return;
    }

    // Agregar el mensaje del usuario a la consola
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    try {
      // Enviar el mensaje al backend
      const res = await axios.post('/api/bot-commands/send', { command: input });

      // Agregar la respuesta del bot a la consola
      setMessages((prev) => [...prev, { sender: 'bot', text: res.data.response }]);
    } catch (error) {
      console.error('Error al enviar el comando:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Hubo un error al procesar tu solicitud.' }]);
    }

    setInput(''); // Limpiar el campo de entrada
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Administración del Bot</h1>
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
              <strong>{msg.sender === 'user' ? 'Tú' : 'Bot'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
      </div>
    </div>
  );
};

export default BotAdmin;
