const { GeneralAICommands } = require('../models/database');
const { extractTextFromImage } = require('../services/imageProcessing');

const processCommand = async (req, res) => {
  try {
    const { command } = req.body;

    // Simulación de respuesta de la IA General
    const response = `La IA General procesó el comando: "${command}"`;

    // Guardar el comando y la respuesta en la base de datos
    await GeneralAICommands.create({ command, response });

    res.status(200).json({ message: 'Comando procesado exitosamente.', response });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el comando.' });
  }
};

const getCommandHistory = async (req, res) => {
  try {
    const history = await GeneralAICommands.findAll({ order: [['executedAt', 'DESC']] });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de comandos.' });
  }
};

// Endpoint para procesar imágenes
const processImage = async (req, res) => {
  const { imagePath } = req.body;
  try {
    const text = await extractTextFromImage(imagePath);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la imagen', error });
  }
};

module.exports = { processCommand, getCommandHistory, processImage };
