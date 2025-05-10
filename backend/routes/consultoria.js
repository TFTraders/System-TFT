const express = require('express');
const router = express.Router();
const { getConsultoria, createConsultoria } = require('../controllers/consultoriaController');

// Obtener todas las solicitudes de consultoría
router.get('/', getConsultoria);

// Crear una nueva solicitud de consultoría
router.post('/create', createConsultoria);

module.exports = router;
