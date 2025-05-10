const express = require('express');
const router = express.Router();
const { createEvent, getEvents, deleteEvent } = require('../controllers/calendarController');

// Crear un evento en el calendario
router.post('/create', createEvent);

// Obtener todos los eventos del calendario
router.get('/events', getEvents);

// Eliminar un evento del calendario
router.delete('/delete/:id', deleteEvent);

module.exports = router;
