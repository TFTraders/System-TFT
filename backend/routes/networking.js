const express = require('express');
const router = express.Router();
const { getNetworkingEvents, createNetworkingEvent } = require('../controllers/networkingController');

// Obtener eventos de networking
router.get('/', getNetworkingEvents);

// Crear un nuevo evento de networking
router.post('/create', createNetworkingEvent);

module.exports = router;
