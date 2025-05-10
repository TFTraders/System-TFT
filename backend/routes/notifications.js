const express = require('express');
const router = express.Router();
const { scheduleNotification, getNotificationHistory } = require('../controllers/notificationsController');

// Programar una notificación
router.post('/schedule', scheduleNotification);

// Obtener historial de notificaciones enviadas
router.get('/history', getNotificationHistory);

module.exports = router;
