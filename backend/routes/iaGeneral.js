const express = require('express');
const router = express.Router();
const { getSystemAnalysis } = require('../controllers/iaGeneralController');
const { authMiddleware, roleMiddleware } = require('../controllers/authController');

// Ruta protegida para administradores
router.get('/analyze', authMiddleware, roleMiddleware(['Admin']), getSystemAnalysis);

module.exports = router;
