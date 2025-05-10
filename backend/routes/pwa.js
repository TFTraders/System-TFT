const express = require('express');
const router = express.Router();
const { registerPWAInstall } = require('../controllers/pwaController');

// Endpoint para registrar instalaciones de la PWA
router.post('/install', registerPWAInstall);

module.exports = router;
