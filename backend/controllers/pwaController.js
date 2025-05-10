const { PWAInstall } = require('../models/database');

const registerPWAInstall = async (req, res) => {
  try {
    const { userAgent } = req.body;

    // Validar si ya existe un registro con el mismo userAgent
    const existingInstall = await PWAInstall.findOne({ where: { userAgent } });
    if (existingInstall) {
      return res.status(200).json({ message: 'Instalación ya registrada.' });
    }

    await PWAInstall.create({ userAgent });
    res.status(201).json({ message: 'Instalación registrada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la instalación.' });
  }
};

module.exports = { registerPWAInstall };
