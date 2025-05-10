const { enviarAlertaTelegram } = require('./services/telegram');

// Mensaje de prueba
const mensajePrueba = '📢 *Prueba de Alerta*\n\nEste es un mensaje de prueba enviado desde el sistema TFT.';

// Enviar mensaje al grupo de Telegram
enviarAlertaTelegram(mensajePrueba)
  .then(() => {
    console.log('Mensaje enviado correctamente.');
  })
  .catch((error) => {
    console.error('Error al enviar el mensaje:', error);
  });
