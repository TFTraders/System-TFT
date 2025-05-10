const { ScheduledNotifications } = require('../models/database');
const { extractTextFromImage } = require('../services/imageProcessing');

const scheduleNotification = async (req, res) => {
  try {
    const { title, message, image, link, date, time, repeat } = req.body;

    // Guardar la notificación programada en la base de datos
    await ScheduledNotifications.create({ title, message, image, link, date, time, repeat });

    res.status(201).json({ message: 'Notificación programada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al programar la notificación.' });
  }
};

const getNotificationHistory = async (req, res) => {
  try {
    const history = await ScheduledNotifications.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial de notificaciones.' });
  }
};

// Endpoint para procesar imágenes en la IA de notificaciones
async function processImageForNotifications(req, res) {
  const { imagePath } = req.body;
  try {
    const text = await extractTextFromImage(imagePath);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la imagen para notificaciones', error });
  }
}

module.exports = { scheduleNotification, getNotificationHistory, processImageForNotifications };
