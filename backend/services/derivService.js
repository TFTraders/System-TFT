const WebSocket = require('ws');

const derivSocket = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

const subscribeToSyntheticIndices = (callback) => {
  const indices = ['R_100', 'R_75', 'R_50', 'R_25', 'R_10']; // Índices sintéticos
  indices.forEach((index) => {
    derivSocket.send(
      JSON.stringify({
        ticks: index,
        subscribe: 1,
        app_id: 'OzABPTNYqGhVFFz', // Clave de la API de Deriv
      })
    );
  });

  derivSocket.on('message', (data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.tick) {
      callback({
        market: '⚡ Índices sintéticos',
        name: parsedData.tick.symbol,
        value: parsedData.tick.quote.toFixed(2),
        change: Math.random() > 0.5 ? (Math.random() * 2).toFixed(2) : -(Math.random() * 2).toFixed(2), // Simulación de cambio
      });
    }
  });

  derivSocket.on('error', (error) => {
    console.error('Error en la conexión con Deriv:', error);
  });

  derivSocket.on('close', () => {
    console.log('Conexión con Deriv cerrada. Reconectando...');
    setTimeout(() => subscribeToSyntheticIndices(callback), 5000); // Reconectar después de 5 segundos
  });
};

module.exports = { subscribeToSyntheticIndices };
