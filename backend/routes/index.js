const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const botCommandsRoutes = require('./botCommands');
const botManagementRoutes = require('./botManagement');
const fileUploadRoutes = require('./fileUpload');

// Registrar rutas
router.use('/auth', authRoutes);
router.use('/bot-commands', botCommandsRoutes);
router.use('/bot-management', botManagementRoutes);
router.use('/file-upload', fileUploadRoutes);

module.exports = router;
