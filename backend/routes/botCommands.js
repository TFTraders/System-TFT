const express = require('express');
const router = express.Router();
const { processCommand, confirmCommand } = require('../controllers/botCommandsController');
const { authMiddleware, roleMiddleware } = require('../controllers/authController');

// Ruta para enviar comandos al bot
router.post('/send', authMiddleware, roleMiddleware(['Admin']), processCommand);

// Ruta para confirmar la ejecución de un comando
router.post('/confirm', authMiddleware, roleMiddleware(['Admin']), confirmCommand);

module.exports = router;
