require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Configuración del bot de Telegram
const token = process.env.TELEGRAM_TOKEN; // Token del bot
const chatIdGrupo = process.env.TELEGRAM_CHAT_ID; // ID del grupo
const bot = new TelegramBot(token, { polling: true });

// Enviar alerta al grupo de Telegram
function enviarAlertaTelegram(mensaje) {
  return bot.sendMessage(chatIdGrupo, mensaje)
    .then(() => console.log('Mensaje enviado correctamente.'))
    .catch((error) => console.error('Error al enviar el mensaje:', error));
}

// Actualizar la descripción del grupo
function actualizarDescripcionGrupo() {
  const descripcion = `🌟 Bienvenido al grupo oficial de Training for Traders (TFT) 🌟

🔹 Valores: Transparencia, Ética y Excelencia.
🔹 Misión: Empoderar a traders con herramientas avanzadas y educación personalizada.
🔹 Servicios: Auditorías, alertas de trading, y más.

📈 ¡Únete a nuestra comunidad y lleva tu trading al siguiente nivel!`;

  return bot.setChatDescription(chatIdGrupo, descripcion)
    .then(() => console.log('Descripción del grupo actualizada correctamente.'))
    .catch((error) => console.error('Error al actualizar la descripción del grupo:', error));
}

// Actualizar la imagen de perfil del grupo
function actualizarImagenGrupo() {
  const rutaImagen = './assets/icons/money-icon.png'; // Ruta de la imagen del ícono de dinero
  return bot.setChatPhoto(chatIdGrupo, fs.createReadStream(rutaImagen))
    .then(() => console.log('Imagen de perfil del grupo actualizada correctamente.'))
    .catch((error) => console.error('Error al actualizar la imagen del grupo:', error));
}

// Exportar funciones
module.exports = { enviarAlertaTelegram, actualizarDescripcionGrupo, actualizarImagenGrupo };
