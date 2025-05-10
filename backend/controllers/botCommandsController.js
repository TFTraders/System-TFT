const { interpretCommand, executeCommand } = require('../services/botService');
const { extractTextFromImage } = require('../services/imageProcessing');

let pendingCommand = null;

const processCommand = async (req, res) => {
  try {
    const { command } = req.body;

    // Interpretar el comando
    const response = await interpretCommand(command);
    pendingCommand = { command, response };

    res.status(200).json({
      message: 'Comando procesado. Confirme para ejecutar.',
      response,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el comando.' });
  }
};

const confirmCommand = async (req, res) => {
  try {
    if (!pendingCommand) {
      return res.status(400).json({ error: 'No hay comandos pendientes para confirmar.' });
    }

    // Ejecutar el comando confirmado
    const result = await executeCommand(pendingCommand.command);
    pendingCommand = null;

    res.status(200).json({
      message: 'Comando ejecutado con éxito.',
      result,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al ejecutar el comando.' });
  }
};

// Endpoint para procesar imágenes en la IA de comandos del bot
async function processImageForBot(req, res) {
  const { imagePath } = req.body;
  try {
    const text = await extractTextFromImage(imagePath);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la imagen para el bot', error });
  }
}

module.exports = { processCommand, confirmCommand, processImageForBot };
