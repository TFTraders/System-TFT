const express = require('express');
const multer = require('multer');
const { processTrainingData } = require('../controllers/fileUploadController');
const { authMiddleware, roleMiddleware } = require('../controllers/authController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Subir archivos para entrenamiento
router.post('/upload', authMiddleware, roleMiddleware(['Admin']), upload.single('file'), processTrainingData);

module.exports = router;
