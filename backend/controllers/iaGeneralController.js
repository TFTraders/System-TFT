const { analyzeSystem } = require('../services/iaGeneralService');
const { extractTextFromImage } = require('../services/imageProcessing');

const getSystemAnalysis = async (req, res) => {
  try {
    const analysis = await analyzeSystem();
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el análisis del sistema' });
  }
};

// Endpoint para procesar imágenes en la IA General
const processImage = async (req, res) => {
  const { imagePath } = req.body;
  try {
    const text = await extractTextFromImage(imagePath);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la imagen', error });
  }
};

module.exports = { getSystemAnalysis, processImage };
