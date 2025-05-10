const express = require('express');
const router = express.Router();
const { getTPTModules, getEmotionalRegistry, saveProgress } = require('../controllers/tptController');
const { authMiddleware, roleMiddleware } = require('../controllers/authController');

// Rutas protegidas para TPT
router.get('/modules', authMiddleware, roleMiddleware(['Alumno TPT', 'Admin']), getTPTModules);
router.post('/emotional-registry', authMiddleware, roleMiddleware(['Alumno TPT', 'Admin']), getEmotionalRegistry);
router.post('/progress', authMiddleware, roleMiddleware(['Alumno TPT', 'Admin']), saveProgress);

module.exports = router;
