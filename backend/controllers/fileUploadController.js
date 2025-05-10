const fs = require('fs');
const path = require('path');
const { trainBotAI } = require('../services/botService');

const processTrainingData = async (req, res) => {
  try {
    const { file } = req;
    const { context } = req.body;

    const filePath = path.join(__dirname, '../../', file.path);
    console.log(`Archivo recibido: ${filePath}`);
    console.log(`Contexto: ${context}`);

    // Entrenar la IA con el archivo y el contexto
    const result = await trainBotAI(filePath, context);

    res.status(200).json({ message: 'Archivo procesado exitosamente.', result });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el archivo.' });
  }
};

module.exports = { processTrainingData };
