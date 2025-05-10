const express = require('express');
const router = express.Router();
const { createBot, updateBot, toggleBotState, toggleCopyTrade } = require('../controllers/botManagementController');
const { authMiddleware, roleMiddleware } = require('../controllers/authController');

// Crear un nuevo bot
router.post('/create', authMiddleware, roleMiddleware(['Admin']), createBot);

// Actualizar configuración de un bot
router.put('/update/:id', authMiddleware, roleMiddleware(['Admin']), updateBot);

// Iniciar/pausar un bot
router.post('/toggle-state/:id', authMiddleware, roleMiddleware(['Admin']), toggleBotState);

// Activar/desactivar CopyTrade
router.post('/toggle-copytrade/:id', authMiddleware, roleMiddleware(['Admin']), toggleCopyTrade);

module.exports = router;
