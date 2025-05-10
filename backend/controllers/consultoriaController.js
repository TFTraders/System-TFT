const { Consultoria } = require('../models/database');
const { extractTextFromImage } = require('../services/imageProcessing');

const getConsultoria = async (req, res) => {
  try {
    const consultorias = await Consultoria.findAll();
    res.status(200).json(consultorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las solicitudes de consultoría.' });
  }
};

const createConsultoria = async (req, res) => {
  try {
    const { usuario, tema, descripcion } = req.body;
    const nuevaConsultoria = await Consultoria.create({ usuario, tema, descripcion });
    res.status(201).json(nuevaConsultoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la solicitud de consultoría.' });
  }
};

// Endpoint para procesar imágenes en la IA de consultoría
async function processImageForConsulting(req, res) {
  const { imagePath } = req.body;
  try {
    const text = await extractTextFromImage(imagePath);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la imagen para consultoría', error });
  }
}

module.exports = { getConsultoria, createConsultoria, processImageForConsulting };
