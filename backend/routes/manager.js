const express = require('express');
const router = express.Router();
const { getTradingData, getAuditoriaData, getEmocionalData } = require('../controllers/managerController');

// Ruta para obtener datos combinados del Manager de Trading
router.get('/trading-data', getTradingData);

// Ruta para obtener datos de auditoría
router.get('/auditoria', getAuditoriaData);

// Ruta para obtener datos del registro emocional
router.get('/emocional', getEmocionalData);

module.exports = router;
