const express = require('express');
const router = express.Router();
const { getPrices } = require('../controllers/pricesController');

// Endpoint para obtener precios
router.get('/', getPrices);

module.exports = router;
