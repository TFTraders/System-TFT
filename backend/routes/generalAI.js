const express = require('express');
const router = express.Router();
const { processCommand, getCommandHistory } = require('../controllers/generalAIController');

// Procesar un comando para la IA General
router.post('/command', processCommand);

// Obtener historial de comandos de la IA General
router.get('/history', getCommandHistory);

module.exports = router;
