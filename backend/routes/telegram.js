const express = require('express');
const router = express.Router();
const { enviarAlertaTelegram } = require('../services/telegram');

// Endpoint para enviar mensajes al grupo de Telegram
router.post('/enviar', (req, res) => {
    const { mensaje } = req.body;

    if (!mensaje) {
        return res.status(400).json({ error: 'El mensaje es obligatorio.' });
    }

    enviarAlertaTelegram(mensaje)
        .then(() => res.status(200).json({ message: 'Mensaje enviado correctamente.' }))
        .catch((error) => {
            console.error('Error al enviar el mensaje:', error);
            res.status(500).json({ error: 'Error al enviar el mensaje.' });
        });
});

module.exports = router;
