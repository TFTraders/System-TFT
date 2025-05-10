const express = require('express');
const router = express.Router();
const { trainAI, getTrainingReport } = require('../controllers/trainAIController');

// Ruta para entrenar la IA
router.post('/train', trainAI);

// Ruta para obtener el reporte del entrenamiento
router.get('/report', getTrainingReport);

module.exports = router;
