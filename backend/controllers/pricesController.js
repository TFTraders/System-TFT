const axios = require('axios');
const { subscribeToSyntheticIndices } = require('../services/derivService');

let syntheticPrices = [];

// Suscribirse a los índices sintéticos al iniciar el servidor
subscribeToSyntheticIndices((price) => {
  const existingIndex = syntheticPrices.find((p) => p.name === price.name);
  if (existingIndex) {
    existingIndex.value = price.value;
    existingIndex.change = price.change;
  } else {
    syntheticPrices.push(price);
  }
});

const getPrices = async (req, res) => {
  try {
    const otherPrices = [
      { market: '📈 Índices', name: 'S&P 500', value: '5,275.70', change: -2.2 },
      { market: '💱 Divisas', name: 'EUR/USD', value: '1.1159', change: -0.09 },
      { market: '🪙 Criptomonedas', name: 'Bitcoin (BTC)', value: '$77,200.00', change: -1.1 },
      { market: '🛢️ Materias primas', name: 'Petróleo (Brent)', value: '$64.66', change: -0.5 },
    ];

    const allPrices = [...otherPrices, ...syntheticPrices]; // Combinar precios
    res.json(allPrices);
  } catch (error) {
    console.error('Error al obtener los precios:', error);
    res.status(500).json({ error: 'Error al obtener los precios' });
  }
};

module.exports = { getPrices };
